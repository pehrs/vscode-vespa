import { homedir } from 'os';
import fs = require('fs');
import * as path from 'path';
import { outputChannel } from './extension';

import { XMLParser } from "fast-xml-parser";
import { fetchJson, fetchWithTimeout } from './vespaUtils';
import { getDocCountsFromMetrics } from './vespaMetrics';
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
	queryTimeout: string;
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
	queryTimeout: "10s",
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
	queryTimeout(): string {
		return this.vespaConfig.queryTimeout;
	}
	queryTimeoutMs(): number {
		return durationMs(this.queryTimeout());
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
			outputChannel.appendLine(`No config dir, creating ${configDir}`);
			fs.mkdirSync(configDir, { recursive: true });
		}
		outputChannel.appendLine(`Saving Vespa config to ${configFile}`);
		fs.writeFileSync(configFile, JSON.stringify(this.vespaConfig, null, 2));
	}

	// async getDocCounts(clusterName: string) {

	// 	const configEndpoint = this.getCluster(clusterName).configEndpoint;

	// 	const parser = new XMLParser({
	// 		ignoreAttributes: false,
	// 		attributeNamePrefix: ""
	// 	});

	// 	const services_xml = await fetchWithTimeout(vespaContentURL(configEndpoint, "services.xml"))
	// 		.then(urlResponse => urlResponse.text())
	// 		.then(xmlText => parser.parse(xmlText));
	// 	const hosts_xml = await fetchWithTimeout(vespaContentURL(configEndpoint, "hosts.xml"))
	// 		.then(urlResponse => urlResponse.text())
	// 		.then(xmlText => parser.parse(xmlText));

	// 	//outputChannel.appendLine("services_xml: " + JSON.stringify(services_xml));
	// 	//outputChannel.appendLine("hosts_xml: " + JSON.stringify(hosts_xml));

	// 	const metricsUrl = new URL(`${configEndpoint}/metrics/v2/values`);
	// 	return fetchJson(metricsUrl)
	// 		.then(result => result.response)
	// 		.then(metrics => {
	// 			// outputChannel.appendLine("metrics: " + JSON.stringify(metrics));

	// 			return Promise.resolve({
	// 				status: "ok",
	// 				clusterName: clusterName,
	// 				docCounts: getDocCountsFromMetrics(metrics, services_xml, hosts_xml),
	// 			});
	// 		});
	// }
}

export const vespaConfig = new VespaConfig();


