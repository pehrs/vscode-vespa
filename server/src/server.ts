/* --------------------------------------------------------------------------------------------
 * Copyright (c) Matti Pehrs. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';
import { connect } from 'http2';
import { Position } from 'vscode';


// Config in super package.json
// 
// "vespaYql.maxNumberOfProblems": {
//   "scope": "resource",
//   "type": "number",
//   "default": 100,
//   "description": "Controls the maximum number of problems produced by the YQL server."
// },
// "vespaYql.trace.server": {
//   "scope": "window",
//   "type": "string",
//   "enum": [
//     "off",
//     "messages",
//     "verbose"
//   ],
//   "default": "messages",
//   "description": "Traces the communication between VS Code and the YQL server."
// },


// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

let vespaSchemaList: any = null;
let vespaClusterName: string = "";

connection.onInitialize((params: InitializeParams) => {
	console.log('onInitialize()');

	const capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true
			}
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}

	return result;
});

async function getVespaServerConfig(configEndpoint: string) {
	if (vespaSchemaList !== null) {
		return;
	}
	const appIdUrl = `${configEndpoint}/config/v1/cloud.config.application-id`;
	connection.console.log("Calling " + appIdUrl);
	const appIdResult = await fetch(appIdUrl);
	const appId: any = await appIdResult.json();
	connection.console.log("appId: " + JSON.stringify(appId, null, 2));

	const clusterListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/cloud.config.cluster-list`;
	connection.console.log("Calling " + clusterListUrl);
	const clusterListResponse = await fetch(clusterListUrl);
	const clusterList: any = await clusterListResponse.json();
	connection.console.log("clusterList: " + JSON.stringify(clusterList, null, 2));

	// Assume single cluster for now
	vespaClusterName = clusterList.storage[0].name;

	const schemaListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/search.config.schema-info/${vespaClusterName}/search/cluster.${vespaClusterName}`;
	connection.console.log("Calling " + schemaListUrl);
	const schemaListResponse = await fetch(schemaListUrl);
	vespaSchemaList = await schemaListResponse.json();
	connection.console.log("schemaList: " + JSON.stringify(vespaSchemaList, null, 2));
}

connection.onInitialized(() => {
	console.log('onInitialized()');

	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
interface VespaSettings {
	maxNumberOfProblems: number;
	queryEndpoint: string;
	configEndpoint: string;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: VespaSettings = {
	maxNumberOfProblems: 1000,
	queryEndpoint: "http://localhost:8080/search",
	configEndpoint: "http://localhost:19071",
};
let globalSettings: VespaSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<VespaSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <VespaSettings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<VespaSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'vespaYql'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	console.log("onDidChangeContent()");
	// validateTextDocument(change.document);
	validateIndex(change.document);
});

function getVespaSchemas() {
	const schemas = vespaSchemaList.schema as any[];
	const result = schemas.map(s => {
		return s.name as string;
	});
	return result;
}

async function validateIndex(textDocument: TextDocument): Promise<void> {
	// In this simple example we get the settings for every validate run.
	const settings = await getDocumentSettings(textDocument.uri);

	await getVespaServerConfig(settings.configEndpoint);

	// The validator creates diagnostics for all uppercase words length 2 and more
	const text = textDocument.getText();
	connection.console.log("text: " + text);

	const schemas: string[] = getVespaSchemas();

	connection.console.log("validateIndex(): schemas: " + schemas);

	// const pattern = /\bfrom ([\w]+) \b/g;
	const pattern: RegExp = /\bfrom ([a-zA-Z0-9]+) \b/g;
	let m: RegExpExecArray | null;

	const fileName = textDocument.uri.split('/').pop();

	let problems = 0;
	const diagnostics: Diagnostic[] = [];
	while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {

		const indexName = m[1];

		// Validate index
		if (!schemas.includes(indexName)) {
			problems++;
			const diagnostic: Diagnostic = {
				severity: DiagnosticSeverity.Warning,
				range: {
					start: textDocument.positionAt(m.index),
					end: textDocument.positionAt(m.index + m[0].length)
				},
				message: `index ${m[1]} does not exists in the ${vespaClusterName} Vespa cluster!`,
				source: fileName
			};
			if (hasDiagnosticRelatedInformationCapability) {
				diagnostic.relatedInformation = [
					{
						location: {
							uri: textDocument.uri,
							range: Object.assign({}, diagnostic.range)
						},
						message: `Available indices are: ${schemas}`
					}
				];
			}
			diagnostics.push(diagnostic);
		}
	}

	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}


async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// In this simple example we get the settings for every validate run.
	const settings = await getDocumentSettings(textDocument.uri);

	// The validator creates diagnostics for all uppercase words length 2 and more
	const text = textDocument.getText();
	const pattern = /\b[A-Z]{2,}\b/g;
	let m: RegExpExecArray | null;

	let problems = 0;
	const diagnostics: Diagnostic[] = [];
	while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
		problems++;
		const diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Warning,
			range: {
				start: textDocument.positionAt(m.index),
				end: textDocument.positionAt(m.index + m[0].length)
			},
			message: `${m[0]} is all uppercase.`,
			source: 'ex'
		};
		if (hasDiagnosticRelatedInformationCapability) {
			diagnostic.relatedInformation = [
				{
					location: {
						uri: textDocument.uri,
						range: Object.assign({}, diagnostic.range)
					},
					message: 'Spelling matters'
				},
				{
					location: {
						uri: textDocument.uri,
						range: Object.assign({}, diagnostic.range)
					},
					message: 'Particularly for names'
				}
			];
		}
		diagnostics.push(diagnostic);
	}

	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received a file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	(textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {		

		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.
		return [
			{
				label: 'select',
				kind: CompletionItemKind.Text,
				data: 1
			},
			{
				label: 'from',
				kind: CompletionItemKind.Text,
				data: 2
			}
		];
	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		if (item.data === 1) {
			item.detail = 'TypeScript details';
			item.documentation = 'TypeScript documentation';
		} else if (item.data === 2) {
			item.detail = 'JavaScript details';
			item.documentation = 'JavaScript documentation';
		}
		return item;
	}
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
