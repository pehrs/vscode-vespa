import * as vscode from 'vscode';
import * as fs from 'fs';
import { defaultResult, outputChannel } from './extension';
import { vespaConfig } from './VespaConfig';
import { getNonce } from './utils';

export class YqlResultsPanel {

	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: YqlResultsPanel | undefined;

	public static readonly viewType = 'yqlResults';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	private yql: string;
	private data: any;
	private zipkinLink: string = undefined;
	private queryTimestamp: string = undefined;

	public static createOrShow(extensionUri: vscode.Uri, yql: string, data: any, zipkinLink: string, queryTimestamp: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (YqlResultsPanel.currentPanel) {
			YqlResultsPanel.currentPanel.yql = yql;
			YqlResultsPanel.currentPanel.data = data;
			YqlResultsPanel.currentPanel.zipkinLink = zipkinLink;
			YqlResultsPanel.currentPanel.queryTimestamp = queryTimestamp;
			YqlResultsPanel.currentPanel._panel.reveal(column);
			YqlResultsPanel.currentPanel._update();
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			YqlResultsPanel.viewType,
			'YQL Results',
			column || vscode.ViewColumn.One,
			getYqlResultsWebviewOptions(extensionUri)
		);

		YqlResultsPanel.currentPanel = new YqlResultsPanel(panel, extensionUri, yql, data, zipkinLink, queryTimestamp);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		// FIXME: How should this be handled?
		YqlResultsPanel.currentPanel = new YqlResultsPanel(panel, extensionUri, "", defaultResult, undefined, undefined);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, yql: string, data: any, zipkinLink: string, queryTimestamp:string) {
		this._panel = panel;
		this.yql = yql;
		this.data = data;
		this.zipkinLink = zipkinLink;
		this.queryTimestamp = queryTimestamp;
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
					case 'save_json':
						this.saveResultJsonAs();
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public saveResultJsonAs() {
		vscode.window.showSaveDialog({ title: "Save Result JSON as" }).then(fileInfos => {
			// here you can use fs to handle data saving
			outputChannel.appendLine("Saving " + JSON.stringify(this.data, null, 2));
			fs.writeFileSync(fileInfos.path, JSON.stringify(this.data, null, 2));
		});
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		YqlResultsPanel.currentPanel = undefined;

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

		// Vary the webview's content based on where it is located in the editor.
		// switch (this._panel.viewColumn) {
		// 	case vscode.ViewColumn.Two:
		// 		this._updateForCat(webview, 'Compiling Cat');
		// 		return;
		// 	case vscode.ViewColumn.Three:
		// 		this._updateForCat(webview, 'Testing Cat');
		// 		return;
		// 	case vscode.ViewColumn.One:
		// 	default:
		// 		this._updateForCat(webview, 'Coding Cat');
		// 		return;
		// }
		this._panel.webview.html = this._getHtmlForWebview(webview);
	}

	// private _updateForCat(webview: vscode.Webview, catName: string) {
	// 	this._panel.webview.html = this._getHtmlForWebview(webview);
	// }
	private genTable() {
		if (!this.data) {
			return "";
		}
		const root = this.data.root;
		if ("children" in root === false) {
			return "";
		}
		const children = root.children;
		if (children.length === 0) {
			return "";
		}
		let result = "<table>";

		// Collect all fields
		const fieldNames = {};
		for (const childno in children) {
			const child = children[childno];
			for (const column in child.fields) {
				fieldNames[column] = "";
			}
		}

		result += "<tr>";
		for (const column in fieldNames) {
			result += `<th>${column}</th>`;
		}
		result += "</tr>";

		for (const childno in children) {
			const child = children[childno];
			result += "<tr>";
			for (const column in fieldNames) {
				if (column in child.fields) {
					const value: string = child.fields[column];
					if (value.startsWith("http")) {
						result += `<td><a href="${value}">${value}</a></td>`;
					} else {
						result += `<td>${value}</td>`;
					}
				} else {
					result += `<td>&nbsp;</td>`;
				}
			}
			result += "</tr>";
		}

		result += "</table>";
		return result;
	}

	private genTabContainer() {

		let childCount = 0;
		if (this.data && this.data.root && this.data.root.children) {
			childCount = this.data.root.children.length;
		}

		let result = `<div class="tab-frame">`;

		result += `
		<input type="radio" id="yqlRequestTab" name="tabs" checked />
		<label for="yqlRequestTab" checked="checked">Vespa YQL Request</label>`;

		if (childCount > 0) {
			result += `
			<input type="radio" id="yqlTab" name="tabs" checked />
			<label for="yqlTab" checked="checked">Vespa YQL Results</label>`;
		}

		result += `
		<input type="radio" id="jsonTab" name="tabs" />
		<label for="jsonTab">Vespa JSON Response</label>
		`;

		if (this.zipkinLink !== undefined) {
			result += `<input type="radio" id="traceTab" name="tabs"  />
			<label for="traceTab">Trace</label>`;
		}

		// YQL Request
		result += `<div class="tab">`;
		result += `<table>`;
		result += `<tr><th>Vespa Cluster:</th><td>${vespaConfig.default()}</td></tr>`;
		result += `<tr><th>Query Endpoint:</th><td>${vespaConfig.queryEndpoint()}</td></tr>`;
		if(this.queryTimestamp) {
			result += `<tr><th>Query Timestamp:</th><td>${this.queryTimestamp}</td></tr>`;
		}
		result += `<tr><th>YQL:</th><td><pre>${this.yql}</pre></td></tr>`;		
		result += `</table>`;
		result += `</div>`;

		// YQL Response
		if (childCount > 0) {
			result += `<div class="tab"><p>${this.genTable()}</p></div>`;
		}

		// JSON
		result += `<div class="tab"><p>`;
		result += `<button class="button" id="save_json_btn">Save JSON</button>`;
		result += `<div><pre>${JSON.stringify(this.data, null, 2)}</pre></div>`;
		result += `</p></div>`;


		// TRACE
		if (this.zipkinLink !== undefined) {
			result += `<div class="tab"><p>`;
			result += `<button class="button" id="save_json_btn"><a href="${this.zipkinLink}">Open in browser...</a></button>`;
			// result += `<h2><a href="${this.zipkinLink}">Open in browser...</a></h2>`;
			result += `<div><iframe width="100%" height=1024px" src="${this.zipkinLink}" title="Zipkin Trace"></iframe></div>`;
			result += `</p></div>`;
		}

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
		let cspUrl = "http://127.0.0.1:9411 http://localhost:9411";
		if (this.zipkinLink !== undefined) {
			const url = new URL(this.zipkinLink);
			cspUrl = `${url.protocol}//${url.host}`;
			if (url.hostname === "localhost") {
				cspUrl = `${url.protocol}//127.0.0.1:${url.port} ${cspUrl}`;
			}
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
				style-src ${cspUrl} ${webview.cspSource}; 
				frame-src ${cspUrl};
				img-src   ${cspUrl} ${webview.cspSource} https:; 
				script-src ${cspUrl} 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesResetUri}" rel="stylesheet"/>
				<link href="${stylesMainUri}" rel="stylesheet"/>
				<link href="${stylesTableUri}" rel="stylesheet"/>
				<link href="${stylesTabsUri}" rel="stylesheet"/>

				<title>YQL Results</title>
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



export function registerResultsPanelView(context: vscode.ExtensionContext) {
	vscode.window.registerWebviewPanelSerializer(YqlResultsPanel.viewType, {
		async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
			outputChannel.appendLine(`Got state: ${state}`);
			// Reset the webview options so we use latest uri for `localResourceRoots`.
			webviewPanel.webview.options = getYqlResultsWebviewOptions(context.extensionUri);
			YqlResultsPanel.revive(webviewPanel, context.extensionUri);
		}
	});
}