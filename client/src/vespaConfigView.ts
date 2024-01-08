import * as vscode from 'vscode';
import { outputChannel, showError } from './extension';
import { homedir } from 'os';
import fs = require('fs');
import * as path from 'path';
import { EventEmitter } from 'stream';
import { vespaConfig } from './VespaConfig';
import { VespaStatusResultsPanel } from './VespaStatusResultsPanel';

export class VespaConfigView {

	vespaConfigProvider: VespaConfigProvider;

	context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.vespaConfigProvider = new VespaConfigProvider(context);

		this.registerSetDefaultCommand();

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


export class VespaConfigProvider implements vscode.TreeDataProvider<{ key: string }> {

	private _onDidChangeTreeData: vscode.EventEmitter<{ key: string } | undefined> = new vscode.EventEmitter<{ key: string } | undefined>();
	readonly onDidChangeTreeData: vscode.Event<{ key: string } | undefined> = this._onDidChangeTreeData.event;

	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	getChildren(element: { key: string }): { key: string }[] {

		if (element !== undefined && element.key.startsWith("cluster:")) {

			const clusterName = element.key.replace("cluster:", "");
			// outputChannel.appendLine("clusterName: " +clusterName + ", default: " + vespaConfig.defaultCluster);
			return [
				{ key: `queryEndpoint|${clusterName}` },
				{ key: `configEndpoint|${clusterName}` },
				{ key: `zipkinEndpoint|${clusterName}` },
			];
		}


		if (element !== undefined) {
			// return getChildren(element ? element.key : undefined).map(key => getNode(key));
			switch (element.key) {
				case "vespa-config":
					return [
						{ key: "defaultCluster" },
						{ key: "clusters" },
					];
				case "clusters":
					return vespaConfig.clusters().map(cluster => {
						return { key: `cluster:${cluster.name}` };
					});
			}
		}
		return [
			{ key: "vespa-config" },
		];
	}

	getTreeItem(element: { key: string }): vscode.TreeItem {
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


		if (element.key.startsWith("cluster:")) {

			const clusterName = element.key.replace("cluster:", "");
			// outputChannel.appendLine("clusterName: " +clusterName + ", default: " + vespaConfig.defaultCluster);

			return {
				label: clusterName,
				// iconPath: clusterName === vespaConfig.defaultCluster ?new vscode.ThemeIcon("$(zap)"): "",
				iconPath: clusterName === vespaConfig.default() ? {
					light: this.context.asAbsolutePath(path.join('media', 'boolean.svg')),
					dark: this.context.asAbsolutePath(path.join('media', 'boolean.svg'))
				} : "",
				tooltip: new vscode.MarkdownString(`$(zap) Tooltip for ${element.key}`, true),
				collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
				contextValue: "VESPA_CLUSTER",
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
					label: `defaultCluster: ${vespaConfig.default()}`,
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

	getParent?(element: { key: string }): { key: string } | undefined {
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
				key: `cluster:${clusterName}`
			};
		}

		switch (element.key) {
			case "clusters":
			case "defaultCluster":
				return {
					key: "vespa-config",
				};
		}
		return undefined;
	}


}