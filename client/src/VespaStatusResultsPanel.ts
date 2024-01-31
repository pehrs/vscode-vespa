import * as vscode from 'vscode';
import { showError } from './extension';
import { VespaClusterConfig, vespaConfig } from './VespaConfig';
import { fmtBytes, fmtNum, formatNumber, getNonce } from './utils';
import { VespaDocInfo, VespaDocTypeInfo, VespaDocTypesInfo } from './model/VespaDocTypeInfo';
import { VespaV2Metrics } from './model/VespaMetrics';
import { fetchWithTimeout } from './vespaUtils';
import hljs from 'highlight.js';
import { jsonLang } from './jsonLang';
hljs.registerLanguage('json', jsonLang);

//
// This panel has two modes one for a single index/doctype view and one for multiple index/doctype view
export class VespaStatusResultsPanel {
	public static currentPanel: VespaStatusResultsPanel | undefined;

	public static readonly viewType = 'yqlDocCountResults';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	private clusterConfig: VespaClusterConfig;
	private docInfo: VespaDocTypesInfo;
	private status: string;
	private timestamp: Date;

	public static createOrShow(extensionUri: vscode.Uri,
		clusterConfig: VespaClusterConfig,
		docInfo: VespaDocTypesInfo,
		status: string,
		timestamp: Date) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (VespaStatusResultsPanel.currentPanel) {
			VespaStatusResultsPanel.currentPanel.docInfo = docInfo;
			VespaStatusResultsPanel.currentPanel.clusterConfig = clusterConfig;
			VespaStatusResultsPanel.currentPanel.status = status;
			VespaStatusResultsPanel.currentPanel.timestamp = timestamp;
			VespaStatusResultsPanel.currentPanel._panel.reveal(column);
			VespaStatusResultsPanel.currentPanel._update();
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			VespaStatusResultsPanel.viewType,
			'Vespa Cluster Info',
			column || vscode.ViewColumn.One,
			getYqlResultsWebviewOptions(extensionUri)
		);

		VespaStatusResultsPanel.currentPanel =
			new VespaStatusResultsPanel(panel, extensionUri, clusterConfig, docInfo, status, timestamp);
	}


	static showClusterStatus(extensionUri: vscode.Uri) {

		vespaConfig.fetchConfigId()
		.then((_) => {
			const cluster = vespaConfig.defaultCluster();
			const timeoutMs = vespaConfig.httpTimeoutMs();
	
			const statusUrl = `${cluster.configEndpoint}/status`;
	
			fetchWithTimeout(statusUrl, timeoutMs)
				.then(statusRes => statusRes.json()
					.then(status =>
						VespaV2Metrics.fetchDocInfo(cluster.configEndpoint)
							.then(docInfo => {
								// outputChannel.appendLine("docInfo: " + JSON.stringify(docInfo, jsonMapReplacer));				
								VespaStatusResultsPanel.createOrShow(extensionUri, cluster, docInfo,
									JSON.stringify(status, null, 2), new Date());
							}).catch(error => {
								showError("docCounts failed " + error + "\n" + error.stack);
							})
					));
		});

	}


	private constructor(panel: vscode.WebviewPanel,
		extensionUri: vscode.Uri,
		clusterConfig: VespaClusterConfig,
		docInfo: VespaDocTypesInfo,
		status: string,
		timestamp: Date) {
		this._panel = panel;
		this.clusterConfig = clusterConfig;
		this.docInfo = docInfo;
		this.status = status;
		this.timestamp = timestamp;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public dispose() {
		VespaStatusResultsPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		const webview = this._panel.webview;
		this._panel.webview.html = this._getHtmlForWebview(webview);
	}

	private genTabContainer() {


		let result = `<div class="tab-frame">`;
		result += `
			<input type="radio" id="status" name="tabs" checked />
			<label for="status" checked="checked">Vespa Status</label>`;

		result += `
			<input type="radio" id="docCountTab" name="tabs" />
			<label for="docCountTab" checked="checked">Vespa Cluster Documents</label>`;

		if (this.clusterConfig) {
			result += `
			<input type="radio" id="clusterStatusTab" name="tabs" />
			<label for="clusterStatusTab">Vespa Cluster Controller Status</label>`;
		}

		const url = new URL(this.clusterConfig.configEndpoint);


		// Status
		const highlightedStatus = hljs.highlight(
			this.status,
			{ language: 'json' }
		).value;
		result += `<div class="tab">`;
		result += `<pre>${highlightedStatus}</pre>`;
		result += `</div>`;


		result += `<div class="tab">`;
		const docTypeNames: string[] = this.docInfo.getDocTypeNames();
			// Mutliple indices
			result += `<table>`;
			result += `<tr><th>Vespa Cluster:</th><td>${this.clusterConfig.name}</td></tr>`;
			result += `<tr><th>Query Endpoint:</th><td>${this.clusterConfig.queryEndpoint}</td></tr>`;
			result += `<tr><th>Timestamp:</th><td>${new Date(this.timestamp).toISOString().replace("T", " ")}</td></tr>`;
			result += `</table>`;
			// result += `<tr><th>YQL:</th><td><pre>${JSON.stringify(this.docCounts, null, 2)}</pre></td></tr>`;

			if (docTypeNames.length > 0) {
				docTypeNames.map(docTypeName => {

				const docTypeData: VespaDocTypeInfo = this.docInfo.docTypes.get(docTypeName);

				result += `<h3>DocType: ${docTypeName}</h3>`;
				result += `<table>`;

				result += `<tr>`;
				result += `<th>Group/Node</th>`;
				result += `<th>Doc Count</th>`;
				result += `<th>Memory Usage</th>`;
				result += `<th>Disk Usage</th>`;
				result += `<th>Transaction Log Usage</th>`;
				result += `<th>Match Rate</th>`;
				result += `</tr>`;

				// Total
				result += `<tr>`;
				result += `<th>Total</th>`;
				result += `<td>${fmtNum(docTypeData.total.docCount, 2)} (${formatNumber(docTypeData.total.docCount)})</td>`;
				result += `<td>${fmtBytes(docTypeData.total.memUsageBytes, 2)} (${formatNumber(docTypeData.total.memUsageBytes)})</td>`;
				result += `<td>${fmtBytes(docTypeData.total.diskUsageBytes, 2)} (${formatNumber(docTypeData.total.diskUsageBytes)})</td>`;
				result += `<td>${fmtBytes(docTypeData.total.transactionLogUsageBytes, 2)} (${formatNumber(docTypeData.total.transactionLogUsageBytes)})</td>`;
				result += `<td>${fmtBytes(docTypeData.total.matchRate, 2)} (${formatNumber(docTypeData.total.matchRate)})</td>`;
				result += `</tr>`;

				docTypeData.getGroupDistrubutionKeys().map(distKey => {
					const group: VespaDocInfo = docTypeData.groups.get(distKey);
					result += `<tr>`;
					result += `<th>${distKey} / ${group.hostname}</th>`;
					result += `<td>${fmtNum(group.docCount, 2)} (${formatNumber(group.docCount)})</td>`;
					result += `<td>${fmtBytes(group.memUsageBytes, 2)} (${formatNumber(group.memUsageBytes)})</td>`;
					result += `<td>${fmtBytes(group.diskUsageBytes, 2)} (${formatNumber(group.diskUsageBytes)})</td>`;
					result += `<td>${fmtBytes(group.transactionLogUsageBytes, 2)} (${formatNumber(group.transactionLogUsageBytes)})</td>`;
					result += `<td>${fmtBytes(group.matchRate, 2)} (${formatNumber(group.matchRate)})</td>`;
					result += `</tr>`;

				});

				result += `</table>`;

			});

			result += `</table>`;
		} else {
			result += `<h3>No Doc-types found!</h3>`;
		}
		result += `</div>`;

		const confId = vespaConfig.configId ? vespaConfig.configId : "";
		const clusterStateUrl = `${url.protocol}//${url.hostname}:19050/clustercontroller-status/v1/${confId}`;
		result += `<div class="tab">`;
		result += `<button class="button"><a href="${clusterStateUrl}">Open in browser...</a></button>`;
		result += `<div class="cluster-state"><iframe width="100%" height=1024px" src="${clusterStateUrl}" title="Vespa Cluster State"></iframe></div>`;
		result += `</div>`;

		// end
		result += `</div>`;

		return result;
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Local path to main script run in the webview
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js');

		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		// Local path to css styles
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');
		const stylesTabsPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'tabs.css');
		const stylesTablePath = vscode.Uri.joinPath(this._extensionUri, 'media', 'table.css');

		// Uri to load styles into webview
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);
		const stylesTabsUri = webview.asWebviewUri(stylesTabsPath);
		const stylesTableUri = webview.asWebviewUri(stylesTablePath);

		// Use a nonce to only allow specific scripts to be run
		const nonce = getNonce();

		// Enable the iframe to load the zipkin url

		const url = new URL(this.clusterConfig.configEndpoint);
		let cspUrl = `${url}`;
		cspUrl = `${url.protocol}//${url.hostname}:19050 ${cspUrl}`; // FIXME: should be looked up from model
		if (url.hostname === "localhost") {
			cspUrl = `${url.protocol}//127.0.0.1:${url.port} ${cspUrl}`;
			cspUrl = `${url.protocol}//127.0.0.1:19050 ${cspUrl}`;
		}

		// outputChannel.appendLine(`cspUrl: ${cspUrl}`);
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; 
				style-src ${cspUrl} ${webview.cspSource} https://cdnjs.cloudflare.com; 
				frame-src ${cspUrl};
				img-src   ${cspUrl} ${webview.cspSource} https:; 
				script-src ${cspUrl} 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesResetUri}" rel="stylesheet"/>
				<link href="${stylesMainUri}" rel="stylesheet"/>
				<link href="${stylesTableUri}" rel="stylesheet"/>
				<link href="${stylesTabsUri}" rel="stylesheet"/>
				<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css" rel="stylesheet"/>

				<title>Vespa cluster document counts</title>
			</head>
			<body>

			${this.genTabContainer()}
			
			<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}

}



export function getYqlResultsWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}
