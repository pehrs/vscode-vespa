import exp = require('constants');
import { vespaConfig } from './VespaConfig';
import { outputChannel, showError } from './extension';
import { durationMs, jsonMapReplacer } from './utils';
import { Schema, SchemaConfig } from './model/VespaSchemaConfig';
import { StorageClusterConfig, VespaClusterList } from './model/VespaClusterList';
import { VespaAppId } from './model/VespaAppId';
import { XMLParser } from "fast-xml-parser";
import { fetchJson, fetchWithTimeout } from './vespaUtils';
import { getDocCountsFromMetrics } from './vespaMetrics';
import { VespaServicesXml } from './model/VespaServicesXml';
import { VespaHostsXml } from './model/VespaHostsXml';
import { VespaStatus } from './model/VespaStatus';
import { VespaV2Metric, VespaV2Metrics } from './model/VespaMetrics';
import { VespaDocTypesInfo } from './model/VespaDocTypeInfo';


export class VespaClusterInfo {

	clusterName: string = undefined;
	appId: VespaAppId = undefined;
	clusterList: VespaClusterList = undefined;
	// <cluster.configId, Schema[]>
	clusterSchemas: Map<string, Schema[]> = new Map();

	defaultConfigId() {
		return this.clusterList.storage[0].configid;
	}

	defaultClusterSchemas(): Schema[] {
		return this.clusterSchemas.get(this.defaultConfigId());
	}

	fetchClusterList(): Promise<VespaClusterList> {
		const configEndpoint: string = vespaConfig.configEndpoint();
		const clusterListUrl = `${configEndpoint}/config/v2/tenant/${this.appId.tenant}/application/${this.appId.application}/cloud.config.cluster-list`;
		const timeout = durationMs(vespaConfig.queryTimeout());

		outputChannel.appendLine("Getting Cluster List from " + configEndpoint);
		return fetchWithTimeout(clusterListUrl, timeout)
			.then(response => response.json()
				.then(v => v as VespaClusterList));

	}


	fetchSchemas(storageConfig: StorageClusterConfig): Promise<Schema[]> {
		const configEndpoint: string = vespaConfig.configEndpoint();
		const configid = storageConfig.configid;
		const schemaListUrl = `${configEndpoint}/config/v2/tenant/${this.appId.tenant}/application/${this.appId.application}/search.config.schema-info/${configid}/search/cluster.${configid}`;
		const timeout = durationMs(vespaConfig.queryTimeout());

		outputChannel.appendLine(`Getting Schemas for ${configid} from ${configEndpoint}`);
		return fetchWithTimeout(schemaListUrl, timeout)
			.then(response => response.json()
				.then(v => v as SchemaConfig))
			.then(schemaConfig => {
				return schemaConfig.schema;
			});
	}

	refresh(): Promise<void> {
		if (this.clusterName == undefined || this.clusterName !== vespaConfig.vespaConfig.defaultCluster) {
			this.clusterName = vespaConfig.vespaConfig.defaultCluster;
			return VespaAppId.fetchAppId(vespaConfig)
				.then(appId => this.appId = appId)
				.then(appId => {
					this.fetchClusterList()
						.then(clusterList => this.clusterList = clusterList)
						.then(clusterList => {
							clusterList.storage.map(storageConfig => {
								return this.fetchSchemas(storageConfig)
									.then((schemas: Schema[]) => {
										this.clusterSchemas.set(storageConfig.configid, schemas);
									})
									.catch(error => showError(error.reason));
							});
						})
						.catch(error => showError(error.reason));
				})
				.catch(error => showError(error.reason));
		}
		return Promise.resolve();
	}


	// fetchServiceXml(): Promise<VespaServicesXml> {
	// 	const configEndpoint = vespaConfig.defaultCluster().configEndpoint;
	// 	const parser = new XMLParser({
	// 		ignoreAttributes: false,
	// 		attributeNamePrefix: ""
	// 	});
	// 	return fetchWithTimeout(vespaContentURL(configEndpoint, "services.xml"))
	// 		.then(urlResponse => urlResponse.text())
	// 		.then(xmlText => VespaServicesXml.parseXml(xmlText));
	// }

	// async getDocCounts(clusterName: string) {

	// 	const configEndpoint = vespaConfig.getCluster(clusterName).configEndpoint;

	// 	const parser = new XMLParser({
	// 		ignoreAttributes: false,
	// 		attributeNamePrefix: ""
	// 	});

	// 	const appId = await VespaAppId.fetchAppId(vespaConfig);
	// 	const status = await VespaStatus.fetchVespaStatus(vespaConfig);

	// 	// const services_xml_old = await fetchWithTimeout(vespaContentURL(configEndpoint, "services.xml"))
	// 	// 	.then(urlResponse => urlResponse.text())
	// 	// 	.then(xmlText => parser.parse(xmlText));
	// 	const services_xml = await VespaServicesXml.fetchServiceXml(vespaConfig, status, appId);

	// 	// const hosts_xml = await fetchWithTimeout(vespaContentURL(configEndpoint, "hosts.xml"))
	// 	// 	.then(urlResponse => urlResponse.text())
	// 	// 	.then(xmlText => parser.parse(xmlText));
	// 	const hosts_xml = await VespaHostsXml.fetchHostsXml(vespaConfig, status, appId);

	// 	outputChannel.appendLine("services_xml: " + JSON.stringify(services_xml));
	// 	outputChannel.appendLine("hosts_xml: " + JSON.stringify(hosts_xml));


	// 	const v2Metrics = await VespaV2Metrics.fetchMetrics(vespaConfig);
	// 	// outputChannel.appendLine("v2Metrics: " + JSON.stringify(v2Metrics));
	// 	const docInfo = v2Metrics.getDocInfo(services_xml, hosts_xml);
	// 	outputChannel.appendLine("DOC INFO: " + JSON.stringify(docInfo, jsonMapReplacer));


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


	async getDocInfo(): Promise<VespaDocTypesInfo> {

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ""
		});

		const appId = await VespaAppId.fetchAppId(vespaConfig);
		const status = await VespaStatus.fetchVespaStatus(vespaConfig);

		// const services_xml_old = await fetchWithTimeout(vespaContentURL(configEndpoint, "services.xml"))
		// 	.then(urlResponse => urlResponse.text())
		// 	.then(xmlText => parser.parse(xmlText));
		const services_xml = await VespaServicesXml.fetchServiceXml(vespaConfig, status, appId);

		// const hosts_xml = await fetchWithTimeout(vespaContentURL(configEndpoint, "hosts.xml"))
		// 	.then(urlResponse => urlResponse.text())
		// 	.then(xmlText => parser.parse(xmlText));
		const hosts_xml = await VespaHostsXml.fetchHostsXml(vespaConfig, status, appId);

		outputChannel.appendLine("services_xml: " + JSON.stringify(services_xml));
		outputChannel.appendLine("hosts_xml: " + JSON.stringify(hosts_xml));


		// const v2Metrics = await VespaV2Metrics.fetchMetrics(vespaConfig);
		// // outputChannel.appendLine("v2Metrics: " + JSON.stringify(v2Metrics));
		// const docInfo = v2Metrics.getDocInfo(services_xml, hosts_xml);
		// // outputChannel.appendLine("DOC INFO: " + JSON.stringify(docInfo, jsonMapReplacer));

		// return Promise.resolve(docInfo);

		return VespaV2Metrics.fetchMetrics(vespaConfig)
			.then(v2Metrics => v2Metrics.getDocInfo(services_xml, hosts_xml));
	}


}

export const vespaClusterInfo = new VespaClusterInfo();