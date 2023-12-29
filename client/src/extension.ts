/* --------------------------------------------------------------------------------------------
 * Copyright (c) Matti Pehrs. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

import { vespaResponse2Zipkin } from './vespa_trace_parser';


let client: LanguageClient;

let vespaSchemaList: any = null;
let vespaClusterName: string = "";

const outputChannel = vscode.window.createOutputChannel("Vespa YQL");

export function activate(context: ExtensionContext) {

	getVespaServerConfig();

	// Commands
	registerRunQueryCommand(context);
	registerFormatterCommand(context);

	// NOT Needed yet as we are not saving the result state anywhere
	// Results panel view
	// if (vscode.window.registerWebviewPanelSerializer) {
	// 	// Make sure we register a serializer in activation event
	// 	registerResultsPanelView(context);
	// }

	// Completions
	registerCompletions(context);

	// Start the YQL Language Server: Not enabled as it does not provide very much at the moment.
	// startYqlLanguageServer(context);

	// Show welcome the first time. 
	// FIXME: Not ready yet. We need better formatting than just text for this.
	// registerWelcomeCommand(context);
	// const vespaYqlConfig = vscode.workspace.getConfiguration('vespaYql');
	// const showWelcome: boolean = vespaYqlConfig.get("showWelcome");
	// if (showWelcome) {
	// 	welcome();
	// }
}

function startYqlLanguageServer(context: ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [
			// { scheme: 'file', language: 'plaintext' },
			{ scheme: 'file', language: 'yql' }
		],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'vespaYql',
		'Vespa YQL Server',
		serverOptions,
		clientOptions
	);

	console.log("CLIENT START");

	// Start the client. This will also launch the server
	client.start();
}

function registerCompletions(context: ExtensionContext) {
	const fromCompletions = vscode.languages.registerCompletionItemProvider(
		'yql',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// Make sure we have the server config
				getVespaServerConfig();

				if (vespaSchemaList === null) {
					return undefined;
				}
				// get all text until the `position` and check if it reads `from `
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				outputChannel.appendLine("linePrefix: " + linePrefix);
				if (linePrefix.endsWith('from ')) {
					const schemas: string[] = getVespaSchemaNames();
					return schemas.map(schema =>
						new vscode.CompletionItem(schema, vscode.CompletionItemKind.Method)
					);
				}
				if (linePrefix.endsWith('select ') || linePrefix.endsWith(', ')) {
					const fields: string[] = getVespaSchemaFields();
					fields.push("sddocname");
					fields.push("documentid");
					return fields.map(field =>
						new vscode.CompletionItem(field, vscode.CompletionItemKind.Method)
					);
				}
				return undefined;
			}
		},
		' ' // triggered whenever a space ' ' is being typed
	);
	context.subscriptions.push(fromCompletions);
}

function registerResultsPanelView(context: ExtensionContext) {
	vscode.window.registerWebviewPanelSerializer(YqlResultsPanel.viewType, {
		async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
			outputChannel.appendLine(`Got state: ${state}`);
			// Reset the webview options so we use latest uri for `localResourceRoots`.
			webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
			YqlResultsPanel.revive(webviewPanel, context.extensionUri);
		}
	});
}


function getVespaSchemaNames() {
	const schemas = vespaSchemaList.schema as any[];
	const result = schemas.map(s => {
		return s.name as string;
	});
	return result;
}


function getVespaSchemaFields() {
	const schemas = vespaSchemaList.schema as any[];
	const result = schemas.flatMap(s => {
		const fields = s.field as any[];
		return fields.map(f => f.name as string);
	});
	return result;
}

function showError(msg: string) {
	vscode.window.showInformationMessage("ERROR: " + msg);
	outputChannel.appendLine(msg);
	outputChannel.show();
}

async function getVespaServerConfig() {

	if (vespaSchemaList !== null) {
		return;
	}
	const vespaYqlConfig = vscode.workspace.getConfiguration('vespaYql');
	const configEndpoint: string = vespaYqlConfig.get("configEndpoint");

	const appIdUrl = `${configEndpoint}/config/v1/cloud.config.application-id`;

	outputChannel.appendLine("Getting Vespa config from " + configEndpoint);

	fetch(appIdUrl)
		.then(appIdResult => {
			appIdResult.json()
				.then((appId: any) => {
					// outputChannel.appendLine("appId: " + JSON.stringify(appId, null, 2));
					const clusterListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/cloud.config.cluster-list`;
					// outputChannel.appendLine("Calling " + clusterListUrl);
					fetch(clusterListUrl)
						.then((clusterListResponse: any) => {
							clusterListResponse.json()
								.then((clusterList: any) => {
									//outputChannel.appendLine("clusterList: " + JSON.stringify(clusterList, null, 2));
									// Assume single cluster for now
									vespaClusterName = clusterList.storage[0].name;
									const schemaListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/search.config.schema-info/${vespaClusterName}/search/cluster.${vespaClusterName}`;
									// outputChannel.appendLine("Calling " + schemaListUrl);
									fetch(schemaListUrl)
										.then(schemaListResponse => {
											schemaListResponse.json().then(list => {
												vespaSchemaList = list;
												//outputChannel.appendLine("schemaList: " + JSON.stringify(vespaSchemaList, null, 2));
												outputChannel.appendLine("Got Vespa config!");
											})
												.catch(reason => showError(`Could not parse Vespa schema list from ${configEndpoint}, ${reason}`));
										})
										.catch(reason => showError(`Could not get Vespa schema list from ${configEndpoint}, ${reason}`));
								})
								.catch(reason => showError(`Could not parse Vespa cluster list from ${configEndpoint}, ${reason}`));
						}).catch(reason => {
							showError(`Could not get Vespa cluster list from ${configEndpoint}, ${reason}`);
						});
				})
				.catch(reason => showError(`Could not parse Vespa AppId from ${configEndpoint}, ${reason}`));
		})
		.catch(reason => {
			showError(`Could not get Vespa AppId from ${configEndpoint}, ${reason}`);
		});
}


function registerRunQueryCommand(context: ExtensionContext) {
	const runYqlCommand = vscode.commands.registerCommand('vscode-vespa.runQuery', () => {

		const editor = vscode.window.activeTextEditor;

		const workbenchConfig = vscode.workspace.getConfiguration('vespaYql');
		const queryEndpoint: string = workbenchConfig.get('queryEndpoint');
		const queryTimeout: string = workbenchConfig.get('queryTimeout');

		if (editor) {
			const document = editor.document;
			// Get the document text
			const yql = document.getText();
			// vscode.window.showInformationMessage('FIXME: Run query: ' + yql);
			runYqlQuery(context, queryEndpoint, yql, queryTimeout);
		}
	});
	context.subscriptions.push(runYqlCommand);
}


function registerFormatterCommand(context: ExtensionContext) {
	const runYqlCommand = vscode.commands.registerCommand('vscode-vespa.format', () => {

		const editor = vscode.window.activeTextEditor;

		if (editor) {
			try {
				const document = editor.document;
				// Get the document text
				const yql = document.getText();

				const jsonObj = JSON.parse(yql);
				const newYql = JSON.stringify(jsonObj, null, 2);

				const start = new vscode.Position(0, 0);
				const lastLine = document.lineCount - 1;
				const end = new vscode.Position(lastLine, document.lineAt(lastLine).text.length);
				const allText = new vscode.Range(start, end);

				const edit = new vscode.WorkspaceEdit();
				edit.replace(document.uri, allText, newYql);
				// edit.insert(document.uri, firstLine.range.start, '42\n');

				return vscode.workspace.applyEdit(edit);
			} catch (e) {
				if (typeof e === "string") {
					showError(e);
				} else if (e instanceof Error) {
					showError(e.message);
				}
			}
		}
	});
	context.subscriptions.push(runYqlCommand);
}

// config for ../package.json
// "contributes": {
//     "commands": [
//       {
// 	        "command": "vscode-vespa.welcome",
// 	        "title": "Show Vespa YQL Welcome page."
//       },

// function registerWelcomeCommand(context: ExtensionContext) {
// 	const welcomeCommand = vscode.commands.registerCommand('vscode-vespa.welcome', () => {
// 		welcome();
// 	});
// 	context.subscriptions.push(welcomeCommand);
// }

const querySample = `
{
    "yql": "select * from msmarco where true",
    "offset": 5,
    "ranking": {
        "matchPhase": {
            "ascending": true,
            "maxHits": 15
        }
    },
    "presentation" : {
        "bolding": false,
        "format": "json"
    }
}`;

function welcome() {

	// Config for ../package.json:
	//
	// "contributes": {
	//   "configuration": {
	//      "vespaYql.showWelcome": {
	//         "scope": "resource",
	//         "type": "boolean",
	//         "default": true,
	//         "description": "Show welcome view at start."
	//      }

	const content = `
	Welcome
	-------
	This is the Vespa YQL Extension.

	Keyboard shortcuts
	------------------
	ctrl-enter | cmd-enter - Run the YQL query.

	Sample YQL Reqests
	------------------
	{
		"yql": "select documentid, sddocname, title from msmarco where true limit 100"
	}

	{
		"yql": "select * from sources * where true",
		"offset": 5,
		"ranking": {
			"matchPhase": {
				"ascending": true,
				"maxHits": 15
			}
		},
		"presentation" : {
			"bolding": false,
			"format": "json"
		}
	}
	`;

	const tmpDir = os.tmpdir();
	const tmpPath = path.join(tmpDir, 'yql-welcome.txt');
	fs.writeFileSync(tmpPath, content, "utf-8");
	const openPath = vscode.Uri.file(tmpPath);
	vscode.workspace.openTextDocument(openPath).then(doc => {
		vscode.window.showTextDocument(doc);
	});

	// const uint8array = new TextEncoder().encode(content);
	// const filePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'yql-welcome.md');
	// const uri = vscode.Uri.parse(filePath);
	// vscode.workspace.fs.writeFile(uri, uint8array)
	// 	.then(() => {
	// 		const openPath = vscode.Uri.file(filePath);
	// 		vscode.workspace.openTextDocument(openPath).then(doc => {
	// 			vscode.window.showTextDocument(doc);
	// 		});
	// 	});

	// Disable the showWelcome property to not show the welcome a second time
	const vespaYqlConfig = vscode.workspace.getConfiguration('vespaYql');
	vespaYqlConfig.update("showWelcome", false);
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}


async function runYqlQuery(context: ExtensionContext, queryEndpoint: string, yql: string, queryTimeout: string): Promise<void> {

	const encodedYql = encodeURI(yql);
	const url = `${queryEndpoint}/?timeout=${queryTimeout}`;
	outputChannel.appendLine(`Calling ${queryEndpoint}`); // /?timeout=${queryTimeout}`);

	fetch(url, {
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		body: yql,
	})
		.then(response => {
			response.json()
				.then((data: any) => {
					outputChannel.appendLine("Got Vespa query response!");
					if (data.trace) {
						uploadTrace2Zipkin(data)
							.then((zipkinLink: string) => {
								YqlResultsPanel.createOrShow(context.extensionUri, yql, data, zipkinLink);
							}).catch(reason => {
								outputChannel.appendLine(`ZIPKIN Upload failed: ${reason}`);
								YqlResultsPanel.createOrShow(context.extensionUri, yql, data, undefined);
							});
					} else {
						YqlResultsPanel.createOrShow(context.extensionUri, yql, data, undefined);
					}
				}).catch(reason => {
					showError(`Could not parse response from ${queryEndpoint}, ${reason}`);
				});
		})
		.catch(reason => {
			showError(`Could not run query on ${queryEndpoint}, ${reason}`);
		});

	return;
}

async function uploadTrace2Zipkin(data): Promise<string | undefined> {
	const workbenchConfig = vscode.workspace.getConfiguration('vespaYql');
	const zipkinEndpoint: string = workbenchConfig.get('zipkinEndpoint');

	const spans = vespaResponse2Zipkin(data);

	const url = `${zipkinEndpoint}/api/v2/spans`;
	outputChannel.appendLine(`Uploading zipkin trace to ${zipkinEndpoint}/api/v2/spans`);
	return fetch(url, {
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(spans),
	})
		.then(response => {

			const zipkinLink = `${zipkinEndpoint}/zipkin/traces/${spans[0].traceId}`;
			outputChannel.appendLine(`Zipkin upload done! ${zipkinLink}`);
			return zipkinLink;
		})
		.catch(reason => {
			showError(`Could not upload zipkin trace to ${zipkinEndpoint}, ${reason}`);
			return undefined;
		});

}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

const defaultResult = {
	"root": {
		"id": "toplevel",
		"relevance": 1,
		"fields": {
			"totalCount": 0
		},
		"coverage": {
			"coverage": 100,
			"documents": 1,
			"full": true,
			"nodes": 1,
			"results": 1,
			"resultsFull": 1
		},
		"children": [
		]
	}
};

class YqlResultsPanel {

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

	public static createOrShow(extensionUri: vscode.Uri, yql: string, data: any, zipkinLink: string = undefined) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (YqlResultsPanel.currentPanel) {
			YqlResultsPanel.currentPanel.yql = yql;
			YqlResultsPanel.currentPanel.data = data;
			YqlResultsPanel.currentPanel.zipkinLink = zipkinLink;
			YqlResultsPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			YqlResultsPanel.viewType,
			'YQL Results',
			column || vscode.ViewColumn.One,
			getWebviewOptions(extensionUri),
		);

		YqlResultsPanel.currentPanel = new YqlResultsPanel(panel, extensionUri, yql, data, zipkinLink);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		// FIXME: How should this be handled?
		YqlResultsPanel.currentPanel = new YqlResultsPanel(panel, extensionUri, "", defaultResult);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, yql: string, data: any, zipkinLink: string = undefined) {
		this._panel = panel;
		this.yql = yql;
		this.data = data;
		this.zipkinLink = zipkinLink;
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

		// YQL Response
		if (childCount > 0) {
			result += `<div class="tab"><p>${this.genTable()}</p></div>`;
		}

		// JSON
		result += `<div class="tab"><p>`;
		result += `<div><pre>${JSON.stringify(this.data, null, 2)}</pre></div>`;
		result += `</p></div>`;


		// TRACE
		if (this.zipkinLink !== undefined) {
			result += `<div class="tab"><p>`;
			result += `<h2><a href="${this.zipkinLink}">Open in browser...</a></h2>`;			
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
		if(this.zipkinLink !== undefined) {
			const url = new URL(this.zipkinLink);
			cspUrl = `${url.protocol}//${url.host}`;
			if(url.hostname === "localhost") {
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

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}