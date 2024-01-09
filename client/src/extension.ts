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
import { VespaConfigExplorer } from './VespaConfigExplorer';
import { YqlResultsPanel } from './YqlResultsPanel';
import { vespaConfig } from './VespaConfig';
import { VespaStatusResultsPanel } from './VespaStatusResultsPanel';
import { vespaClusterInfo } from './VespaClusterInfo';
import { VespaSchema } from './model/VespaSchemaConfig';


let client: LanguageClient;

// let vespaSchemaList: any = undefined;
// let vespaClusterName: string = "";
let vespaConfigView: VespaConfigExplorer = undefined;

export const outputChannel: vscode.OutputChannel = vscode.window.createOutputChannel("Vespa YQL");

export function activate(context: ExtensionContext) {

	refreshServerConfig();

	// Commands
	registerRunQueryCommand(context);
	registerFormatterCommand(context);

	registerYqlFormatter(context);
	registerSelectConnection(context);
	registerShowClusterInfo(context);

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

	vespaConfigView = new VespaConfigExplorer(context);


	vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
		if (event.document.fileName.endsWith(vespaConfig.configFilePath())) {
			vespaConfig.loadConfig();
			vespaConfigView.refresh();
			refreshServerConfig();
		}
	});

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
				refreshServerConfig();

				if (vespaClusterInfo.clusterSchemas.size == 0) {
					return undefined;
				}
				// get all text until the `position` and check if it reads `from `
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				// outputChannel.appendLine("linePrefix: " + linePrefix);
				if (linePrefix.endsWith('from ')) {
					const schemas: string[] = getAllVespaSchemaNames();
					return schemas.map(schema =>
						new vscode.CompletionItem(schema, vscode.CompletionItemKind.Method)
					);
				}
				if (linePrefix.endsWith('select ') || linePrefix.endsWith(', ')) {
					const fields: string[] = getAllVespaSchemaFields();
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

function getAllVespaSchemaNames(): string[] {
	const schemas = vespaClusterInfo.defaultClusterSchemas();
	const result: string[] = schemas.map((schema: VespaSchema) => {
		return schema.name;
	});
	return result;
}


function getAllVespaSchemaFields(): string[] {

	const schemas = vespaClusterInfo.clusterSchemas;
	const v = schemas.values;
	const result: string[] = Array.from(schemas.values())
		.flatMap(clusterSchemas => {
			return clusterSchemas.flatMap(schema => schema.field.map(field => field.name));
		});
	return result;
}

export function showError(msg: string) {
	vscode.window.showErrorMessage("ERROR: " + msg);
	outputChannel.appendLine(msg);
	outputChannel.show();
}

function refreshServerConfig(): Promise<void> {
	return vespaClusterInfo.refresh();
}

// async function org_getVespaServerConfig() {

// 	if (vespaSchemaList !== undefined) {
// 		return;
// 	}
// 	// const vespaYqlConfig = vscode.workspace.getConfiguration('vespaYql');
// 	const configEndpoint: string = vespaConfig.configEndpoint();

// 	const appIdUrl = `${configEndpoint}/config/v1/cloud.config.application-id`;

// 	outputChannel.appendLine("Getting Vespa config from " + configEndpoint);

// 	fetch(appIdUrl)
// 		.then(appIdResult => {
// 			appIdResult.json()
// 				.then((appId: any) => {
// 					// outputChannel.appendLine("appId: " + JSON.stringify(appId, null, 2));
// 					const clusterListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/cloud.config.cluster-list`;
// 					// outputChannel.appendLine("Calling " + clusterListUrl);
// 					fetch(clusterListUrl)
// 						.then((clusterListResponse: any) => {
// 							clusterListResponse.json()
// 								.then((clusterList: any) => {
// 									//outputChannel.appendLine("clusterList: " + JSON.stringify(clusterList, null, 2));
// 									// Assume single cluster for now
// 									vespaClusterName = clusterList.storage[0].name;
// 									const schemaListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/search.config.schema-info/${vespaClusterName}/search/cluster.${vespaClusterName}`;
// 									// outputChannel.appendLine("Calling " + schemaListUrl);
// 									fetch(schemaListUrl)
// 										.then(schemaListResponse => {
// 											schemaListResponse.json().then(list => {
// 												vespaSchemaList = list;
// 												//outputChannel.appendLine("schemaList: " + JSON.stringify(vespaSchemaList, null, 2));
// 												outputChannel.appendLine("Got Vespa config!");
// 											})
// 												.catch(reason => showError(`Could not parse Vespa schema list from ${configEndpoint}, ${reason}`));
// 										})
// 										.catch(reason => showError(`Could not get Vespa schema list from ${configEndpoint}, ${reason}`));
// 								})
// 								.catch(reason => showError(`Could not parse Vespa cluster list from ${configEndpoint}, ${reason}`));
// 						}).catch(reason => {
// 							showError(`Could not get Vespa cluster list from ${configEndpoint}, ${reason}`);
// 						});
// 				})
// 				.catch(reason => showError(`Could not parse Vespa AppId from ${configEndpoint}, ${reason}`));
// 		})
// 		.catch(reason => {
// 			showError(`Could not get Vespa AppId from ${configEndpoint}, ${reason}`);
// 		});
// }


function registerRunQueryCommand(context: ExtensionContext) {
	const runYqlCommand = vscode.commands.registerCommand('vscode-vespa.runQuery', () => {

		const editor = vscode.window.activeTextEditor;

		// outputChannel.appendLine(`file:  ${editor.document.fileName}`);

		// const workbenchConfig = vscode.workspace.getConfiguration('vespaYql');

		if (editor && editor.document.fileName.endsWith(".yql")) {
			const document = editor.document;
			// Get the document text
			const yql = document.getText();
			// vscode.window.showInformationMessage('FIXME: Run query: ' + yql);
			runYqlQuery(context, yql);
		}
	});
	context.subscriptions.push(runYqlCommand);
}



function registerSelectConnection(context: ExtensionContext) {
	const cmd = vscode.commands.registerCommand('vscode-vespa.selectConnection', () => {

		const items: vscode.QuickPickItem[] = [];

		const clusters = vespaConfig.clusters();

		for (let index = 0; index < clusters.length; index++) {
			const cluster = clusters[index];
			items.push({
				label: cluster.name,
				description: cluster.queryEndpoint
			});
		}
		vscode.window.showQuickPick(items).then(selection => {
			// the user canceled the selection
			if (!selection) {
				return;
			}
			vespaConfig.setDefault(selection.label);
			vespaConfigView.refresh();
			refreshServerConfig();
		});
	});
	context.subscriptions.push(cmd);
}



function registerYqlFormatter(context: ExtensionContext) {
	vscode.languages.registerDocumentFormattingEditProvider('yql', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {

			formatYql();

			// const firstLine = document.lineAt(0);
			// if (firstLine.text !== '42') {
			// 	return [vscode.TextEdit.insert(firstLine.range.start, '42\n')];
			// }
			return [];
		}
	});
}


function formatYql() {
	const editor = vscode.window.activeTextEditor;

	outputChannel.appendLine(`format ${editor.document.fileName}`);

	if (editor && editor.document.fileName.endsWith(".yql")) {
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
}

function registerShowClusterInfo(context: ExtensionContext) {

	const cmd = vscode.commands.registerCommand("vscode-vespa.showClusterInfo", args => {
		VespaStatusResultsPanel.showClusterStatus(context.extensionUri);
	});
	context.subscriptions.push(cmd);
}


function registerFormatterCommand(context: ExtensionContext) {
	const runYqlCommand = vscode.commands.registerCommand('vscode-vespa.format', () => {
		formatYql();
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
    "yql": "select * from msmarco where true limit 10",
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

async function runYqlQuery(context: ExtensionContext, yql: string): Promise<void> {

	const queryEndpoint: string = vespaConfig.queryEndpoint();
	const timeout: string = vespaConfig.httpTimeout();

	const encodedYql = encodeURI(yql);
	const url = `${queryEndpoint}/?timeout=${timeout}`;
	outputChannel.appendLine(`Calling ${queryEndpoint}`);

	const queryTimestamp: string = new Date().toISOString();

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
								YqlResultsPanel.createOrShow(context.extensionUri, yql, data, zipkinLink, queryTimestamp);
							}).catch(reason => {
								outputChannel.appendLine(`ZIPKIN Upload failed: ${reason}`);
								YqlResultsPanel.createOrShow(context.extensionUri, yql, data, undefined, queryTimestamp);
							});
					} else {
						YqlResultsPanel.createOrShow(context.extensionUri, yql, data, undefined, queryTimestamp);
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
	// const workbenchConfig = vscode.workspace.getConfiguration('vespaYql');
	const zipkinEndpoint: string = vespaConfig.zipkinEndpoint();

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

export const defaultResult = {
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
