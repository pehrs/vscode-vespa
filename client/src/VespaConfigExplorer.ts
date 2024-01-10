import * as vscode from 'vscode';
import { outputChannel, showError } from './extension';
import fs = require('fs');
import * as path from 'path';
import { vespaConfig } from './VespaConfig';
import { VespaSchemaField, VespaSchema, VespaSchemaConfig } from './model/VespaSchemaConfig';
import { VespaAppId } from './model/VespaAppId';
import { VespaClusterList } from './model/VespaClusterList';
import { VespaStatusResultsPanel } from './VespaStatusResultsPanel';
import { VespaV2Metrics } from './model/VespaMetrics';
import { AppContent } from './model/AppContent';
import { text } from 'stream/consumers';

const appContent: AppContent = new AppContent();

export class VespaConfigExplorer {

	vespaConfigProvider: VespaConfigProvider;

	context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.vespaConfigProvider = new VespaConfigProvider(context);

		this.registerSetDefaultCommand();
		this.registerShowClusterStatusCommand(context);
		this.registerOpenFile();

		vscode.commands.registerCommand("vscode-vespa.refreshVespaConfig", args => {
			if (args !== undefined) {
				// outputChannel.appendLine("args: " + JSON.stringify(args));
				vespaConfig.loadConfig();
				this.refresh();
			}
		});
		vscode.commands.registerCommand("vscode-vespa.editVespaConfig", args => {
			const filePath = vespaConfig.configFilePath();
			const openPath = vscode.Uri.parse(filePath);
			vscode.workspace.openTextDocument(openPath).then(doc => {
				vscode.window.showTextDocument(doc);
			});
		});

		vespaConfig.loadConfig();

		const view = vscode.window.createTreeView('vespaConfigView', { treeDataProvider: this.vespaConfigProvider, showCollapseAll: false });
		context.subscriptions.push(view);
		// vscode.commands.registerCommand('vespaConfigView.reveal', async () => {
		// 	const key = await vscode.window.showInputBox({ placeHolder: 'Type the label of the item to reveal' });
		// 	if (key) {
		// 		await view.reveal({ key }, { focus: true, select: false, expand: true });
		// 	}
		// });
		// vscode.commands.registerCommand('vespaConfigView.changeTitle', async () => {
		// 	const title = await vscode.window.showInputBox({ prompt: 'Type the new title for the Test View', placeHolder: view.title });
		// 	if (title) {
		// 		view.title = title;
		// 	}
		// });

		vscode.window.onDidChangeActiveTextEditor(() => this.onActiveEditorChanged());
		this.onActiveEditorChanged();
	}

	refresh() {
		this.vespaConfigProvider.refresh();
	}



	static showClusterStatus(extensionUri: vscode.Uri, clusterName: string) {

		// outputChannel.appendLine("clusterName: " + clusterName);

		const cluster = vespaConfig.getCluster(clusterName);
		VespaV2Metrics.fetchDocInfo(cluster.configEndpoint)
			.then(docInfo => {
				VespaStatusResultsPanel.createOrShow(extensionUri, cluster, docInfo, new Date());
			}).catch(error => {
				showError("docCounts failed " + error + "\n" + error.stack);
			});
	}

	private registerShowClusterStatusCommand(context: vscode.ExtensionContext) {
		vscode.commands.registerCommand("vscode-vespa.showSelectedClusterInfo", args => {
			if (args !== undefined) {
				const { key } = args;
				if (key.startsWith("cluster:")) {
					const clusterName = key.replace("cluster:", "");
					VespaConfigExplorer.showClusterStatus(context.extensionUri, clusterName);
				}
			}
		});
	}


	private registerSetDefaultCommand() {
		vscode.commands.registerCommand("vscode-vespa.selectClusterAsDefault", args => {
			if (args !== undefined) {
				const { key } = args;
				if (key.startsWith("cluster:")) {
					const clusterName = key.replace("cluster:", "");

					outputChannel.appendLine("setClusterAsDefault: " + clusterName);
					vespaConfig.setDefault(clusterName);
					this.vespaConfigProvider.refresh();
				}
			}
		});
	}



	private registerOpenFile() {
		vscode.commands.registerCommand("vscode-vespa.openSelectedFile", args => {
			if (args !== undefined) {
				const element = args as { key: string; data: { filename: string, cluster: string }; };

				if (element.key === "file") {
					const fileParts = element.data.filename.split("/");
					const fn = element.data.filename.endsWith("/") ?
						fileParts[fileParts.length - 2] :
						fileParts[fileParts.length - 1];

					const clusterName = element.data.cluster;
					const configEndpoint = vespaConfig.getCluster(clusterName).configEndpoint;
					appContent.fetchAppFile(configEndpoint, element.data.filename)
						.then(textData => {
							const fnPath = path.join(vscode.workspace.workspaceFolders[0].uri.path, fn);
							const setting: vscode.Uri = vscode.Uri.parse(`untitled:${fnPath}`);
							vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
								vscode.window.showTextDocument(a, 1, false).then(e => {
									e.edit(edit => {
										edit.insert(new vscode.Position(0, 0), textData);										
									});
								});
							}, (error: any) => {
								showError(JSON.stringify(error));
							});

							// 
							// FIXME: Open "new" file (Will not have a proper filename!!!)
							// 
							// const fnParts = element.data.filename.split(".");
							// const language = fnParts[fnParts.length - 1];
							// vscode.workspace.openTextDocument({
							// 	content: textData,
							// 	language: language
							// }).then(newDocument => {
							// 	vscode.window.showTextDocument(newDocument);
							// });
						});
				}
			}
		});
	}

	private onActiveEditorChanged(): void {

		if (vscode.window.activeTextEditor) {
			if (vscode.window.activeTextEditor.document.uri.scheme === 'file') {
				console.log("languageId: " + vscode.window.activeTextEditor.document.languageId);
				const enabled = vscode.window.activeTextEditor.document.languageId === 'yql';
				vscode.commands.executeCommand('setContext', 'yqlEnabled', enabled);
				if (enabled) {
					// this.vespaConfigProvider.refresh();
				}
			}
		} else {
			vscode.commands.executeCommand('setContext', 'yqlEnabled', false);
		}
	}
}




export class VespaConfigTreeItem extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		private readonly version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);

		this.tooltip = `${this.label}-${this.version}`;
		this.description = this.version;
	}

	iconPath = {
		light: "$(code)",
		dark: "$(code)"
	};

	contextValue = 'config';
}

export class VespaConfigRoot extends vscode.TreeItem {
	iconPath = {
		light: "$(code)",
		dark: "$(code)"
	};
}

const rootClusterItem = new vscode.TreeItem("vespa-config");
const defaultClusterItem = new vscode.TreeItem("defaultCluster");
const clustersItem = new vscode.TreeItem("clusters");


export class VespaConfigProvider implements vscode.TreeDataProvider<{ key: string, data: any }> {

	private _onDidChangeTreeData: vscode.EventEmitter<{ key: string, data: any } | undefined> = new vscode.EventEmitter<{ key: string, data: any } | undefined>();
	readonly onDidChangeTreeData: vscode.Event<{ key: string, data: any } | undefined> = this._onDidChangeTreeData.event;

	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	getChildren(element: { key: string, data: any }): Thenable<{ key: string, data: any }[]> {

		if (element !== undefined && element.key.startsWith("cluster:")) {

			const clusterName = element.key.replace("cluster:", "");
			// outputChannel.appendLine("clusterName: " +clusterName + ", default: " + vespaConfig.defaultCluster);
			return Promise.resolve([
				//{ key: `queryEndpoint|${clusterName}`, data: clusterName, },
				//{ key: `configEndpoint|${clusterName}`, data: clusterName, },
				//{ key: `zipkinEndpoint|${clusterName}`, data: clusterName, },
				{ key: `docTypes|${clusterName}`, data: clusterName, },
				{ key: `appFiles`, data: clusterName, },
			]);
		}

		if (element !== undefined && element.key === "appFiles") {
			// 
			const clusterName = element.data as string;
			const configEndpoint = vespaConfig.getCluster(clusterName).configEndpoint;
			return appContent.fetchAppDir(configEndpoint, "")
				.then(files => {
					return files.map(filename => {
						return {
							key: "file",
							data: {
								filename: filename,
								cluster: clusterName,
							}
						};
					});
				});

		}

		if (element !== undefined && element.key === "file") {
			const data = element.data as { filename: string, cluster: string };
			const clusterName = data.cluster;
			const configEndpoint = vespaConfig.getCluster(clusterName).configEndpoint;
			return appContent.fetchAppDir(configEndpoint, data.filename)
				.then(files => {
					return files.map(filename => {
						return {
							key: "file",
							data: {
								filename: filename,
								cluster: clusterName,
							}
						};
					});
				});
		}

		if (element !== undefined && element.key.startsWith("docTypes|")) {
			const clusterName = element.key.replace("docTypes|", "");
			outputChannel.appendLine("DOC types for: " + clusterName);

			const cluster = vespaConfig.getCluster(clusterName);
			if (cluster) {
				const configEndpoint = cluster.configEndpoint;
				return VespaAppId.fetchAppId(configEndpoint)
					.then(appiId => {
						return VespaClusterList.fetchVespaClusterList(configEndpoint, appiId)
							.then(clusterList => {
								return VespaSchemaConfig.fetchSchemas(configEndpoint, appiId, clusterList.getDefaultConfigId())
									.then(schemaConfig => {
										return schemaConfig.schema.map(schema => {
											outputChannel.appendLine("schema: " + schema.name);
											return {
												key: `docType|${schema.name}`,
												data: {
													clusterName: clusterName,
													configId: clusterList.getDefaultConfigId(),
													schema: schema
												},
											};
										});
									});
							});
					});
			} else {
				return Promise.resolve([]);
			}
		}

		if (element !== undefined && element.key.startsWith("docType|")) {
			const docType = element.key.replace("docType|", "");
			outputChannel.appendLine("Fields for: " + docType);

			const data = element.data as {
				clusterName: string;
				configId: string;
				schema: VespaSchema;
			};

			if (data) {
				// const configEndpoint = vespaConfig.getCluster(data.clusterName).configEndpoint;
				return Promise.resolve(data.schema.field.map(field => {
					return {
						key: "field",
						data: {
							field: field,
						}
					};
				}));
			} else {
				return Promise.resolve([]);
			}
		}

		if (element !== undefined) {
			// return getChildren(element ? element.key : undefined).map(key => getNode(key));
			switch (element.key) {
				case "vespa-config":
					return Promise.resolve([
						{ key: "defaultCluster", data: undefined, },
						{ key: "clusters", data: undefined, },
					]);
				case "clusters":
					return Promise.resolve(vespaConfig.clusters().map(cluster => {
						return { key: `cluster:${cluster.name}`, data: cluster, };
					}));
			}
		}
		if (element === undefined) {
			// return Promise.resolve([
			// 	{ key: "vespa-config", data: undefined, },
			// ]);
			return Promise.resolve([
				{ key: "defaultCluster", data: undefined, },
				{ key: "clusters", data: undefined, },
			]);
		}
		return Promise.resolve([]);
	}

	getTreeItem(element: { key: string, data: any }): vscode.TreeItem {
		// outputChannel.appendLine("getTreeItem(): " + JSON.stringify(element));

		// {key: `queryEndpoint|${cluster.name}|${cluster.queryEndpoint}`},
		if (element.key.startsWith("queryEndpoint|") ||
			element.key.startsWith("configEndpoint|") ||
			element.key.startsWith("zipkinEndpoint|")
		) {
			const keyParts = element.key.split("|");
			const configName = keyParts[0];
			const clusterName = keyParts[1];
			const cluster = vespaConfig.getCluster(clusterName);

			let value = "undefined";
			switch (configName) {
				case "queryEndpoint":
					value = cluster.queryEndpoint;
					break;
				case "configEndpoint":
					value = cluster.configEndpoint;
					break;
				case "zipkinEndpoint":
					value = cluster.zipkinEndpoint;
					break;
			}

			return {
				label: `${configName}: ${value}`,
				// tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				// contextValue: "VESPA_QUERY_ENDPOINT",
			};

		}
		// {key: `configEndpoint|${cluster.name}|${cluster.configEndpoint}`},
		// {key: `zipkinEndpoint|${cluster.name}|${cluster.zipkinEndpoint}`},

		if (element.key.startsWith("docTypes|")) {
			const keyParts = element.key.split("|");
			const clusterName = keyParts[1];

			return {
				label: `doc-types`,
				iconPath: new vscode.ThemeIcon('database'),
				// tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
				contextValue: "VESPA_EXPLORER_DOC_TYPES",
			};
		}

		if (element.key.startsWith("docType|")) {
			const keyParts = element.key.split("|");
			const docType = keyParts[1];

			return {
				label: docType,
				iconPath: new vscode.ThemeIcon('file'),
				// tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
				// contextValue: "VESPA_EXPLORER_DOC_TYPE",
			};
		}

		if (element.key === "field") {
			const data = element.data as {
				field: VespaSchemaField;
			};
			return {
				label: `${data.field.name}: ${data.field.type}`,
				iconPath: new vscode.ThemeIcon('symbol-property'),
				// tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				// contextValue: "VESPA_EXPLORER_DOC_TYPE",
			};
		}

		if (element.key.startsWith("cluster:")) {

			const clusterName = element.key.replace("cluster:", "");
			// outputChannel.appendLine("clusterName: " +clusterName + ", default: " + vespaConfig.defaultCluster);

			return {
				label: clusterName,
				// iconPath: clusterName === vespaConfig.defaultCluster ?new vscode.ThemeIcon("$(zap)"): "",
				// iconPath: clusterName === vespaConfig.default() ? {
				// 	light: this.context.asAbsolutePath(path.join('media', 'boolean.svg')),
				// 	dark: this.context.asAbsolutePath(path.join('media', 'boolean.svg'))
				// } : "",	
				iconPath: clusterName === vespaConfig.default() ?
					new vscode.ThemeIcon('check', new vscode.ThemeColor("testing.runAction"))
					: "",
				tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
				contextValue: "VESPA_CLUSTER",
			};
		}

		if (element.key === "appFiles") {
			const clusterName = element.data as string;

			return {
				label: `application-files`,
				iconPath: new vscode.ThemeIcon('file-directory'),
				// tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
				contextValue: "VESPA_EXPLORER_APP_FILES",
			};
		}

		if (element.key === "file") {
			const data = element.data as { filename: string, cluster: string };

			const fileParts = data.filename.split("/");
			const fn = data.filename.endsWith("/") ?
				fileParts[fileParts.length - 2] :
				fileParts[fileParts.length - 1];


			return {
				label: fn,
				iconPath: data.filename.endsWith("/") ?
					new vscode.ThemeIcon('file-directory') :
					new vscode.ThemeIcon('file'),
				// tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: data.filename.endsWith("/") ?
					vscode.TreeItemCollapsibleState.Collapsed :
					vscode.TreeItemCollapsibleState.None,
				contextValue: data.filename.endsWith("/") ?
					"VESPA_EXPLORER_APP_DIR" :
					"VESPA_EXPLORER_APP_FILE",
			};
		}


		switch (element.key) {
			case "vespa-config":
				return {
					label: "vespa-config",
					//tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
					collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
				};
			case "defaultCluster":
				return {
					label: `connected to: ${vespaConfig.default()}`,
					//tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				};
			case "clusters":
				return {
					label: "clusters",
					//tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
					collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
				};
		}
		return {};
	}

	getParent?(element: { key: string, data: any }): { key: string, data: any } | undefined {
		// outputChannel.appendLine("getParent(): " + element);

		if (element.key.startsWith("queryEndpoint|") ||
			element.key.startsWith("configEndpoint|") ||
			element.key.startsWith("zipkinEndpoint|")
		) {
			const keyParts = element.key.split("|");
			const configName = keyParts[0];
			const clusterName = keyParts[1];
			// const cluster = vespaConfig.getCluster(clusterName);
			return {
				key: `cluster:${clusterName}`,
				data: undefined,
			};
		}

		switch (element.key) {
			case "clusters":
			case "defaultCluster":
				return {
					key: "vespa-config",
					data: undefined,
				};
		}
		return undefined;
	}


}