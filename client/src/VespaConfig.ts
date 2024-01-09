import { homedir } from 'os';
import fs = require('fs');

import { fetchWithTimeout } from './vespaUtils';
import { durationMs } from './utils';

export interface VespaClusterConfig {
	name: string,
	queryEndpoint: string;
	configEndpoint: string;
	zipkinEndpoint?: string;
}

export interface VespaRootConfig {
	defaultCluster: string;
	clusters: VespaClusterConfig[];
	httpTimeout: string;
}

const defaultConfig: VespaRootConfig = {
	defaultCluster: "localhost",
	clusters: [
		{
			name: "localhost",
			queryEndpoint: "http://localhost:8080/search",
			configEndpoint: "http://localhost:19071",
			zipkinEndpoint: "http://localhost:9411",
		}
	],
	httpTimeout: "2s",
};

const configDir = `${homedir()}/.config/vscode-vespa`;


export class VespaConfig {
	vespaConfig: VespaRootConfig = defaultConfig;

	setDefault(clusterName: string) {
		this.vespaConfig.defaultCluster = clusterName;
		this.saveConfig();
		this.fetchConfigId();
	}

	defaultCluster(): VespaClusterConfig {
		return this.clusters().find(c => c.name === this.vespaConfig.defaultCluster);
	}

	getCluster(name: string): VespaClusterConfig {
		return this.clusters().find(c => c.name === name);
	}

	queryEndpoint(): string {
		return this.defaultCluster().queryEndpoint;
	}
	httpTimeout(): string {
		return this.vespaConfig.httpTimeout;
	}
	httpTimeoutMs(): number {
		return durationMs(this.httpTimeout());
	}
	configEndpoint(): string {
		return this.defaultCluster().configEndpoint;
	}
	zipkinEndpoint(): string {
		return this.defaultCluster().zipkinEndpoint;
	}

	default(): string {
		return this.vespaConfig.defaultCluster;
	}

	clusters(): VespaClusterConfig[] {
		return this.vespaConfig.clusters;
	}

	configFilePath(): string {
		return `${configDir}/vespa-config.json`;
	}

	configId = undefined;

	fetchConfigId() {
		// http://localhost:19071/config/v2/tenant/default/application/default/cloud.config.cluster-list
		const url = `${this.defaultCluster().configEndpoint}/config/v2/tenant/default/application/default/cloud.config.cluster-list`;
		fetchWithTimeout(url, 2000)
			.then(response => response.json())
			.then((clusterListJson: any) => {
				// Assume only one config for now...
				this.configId = clusterListJson.storage[0].configid;
			});
	}

	loadConfig() {
		// const homeDir = homedir();
		// const fsPath = vscode.window.activeTextEditor.document.uri.fsPath;
		// outputChannel.appendLine(`loading config from ${this.configFilePath()}`);

		if (fs.existsSync(this.configFilePath())) {
			// File exists in path
			const configTxt = fs.readFileSync(this.configFilePath(), 'utf8');
			this.vespaConfig = JSON.parse(configTxt);
			this.fetchConfigId();
		} else {
			this.saveConfig();
		}
	}

	saveConfig() {
		const configFile = `${configDir}/vespa-config.json`;

		if (!fs.existsSync(configFile)) {
			// outputChannel.appendLine(`No config dir, creating ${configDir}`);
			fs.mkdirSync(configDir, { recursive: true });
		}
		// outputChannel.appendLine(`Saving Vespa config to ${configFile}`);
		fs.writeFileSync(configFile, JSON.stringify(this.vespaConfig, null, 2));
	}
	
}

export const vespaConfig = new VespaConfig();


