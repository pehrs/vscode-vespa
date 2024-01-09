import exp = require('constants');
import { vespaConfig } from './VespaConfig';
import { outputChannel, showError } from './extension';
import { durationMs } from './utils';
import { Schema, SchemaConfig } from './model/VespaSchemaConfig';
import { StorageClusterConfig, VespaClusterList } from './model/VespaClusterList';
import { VespaAppId } from './model/VespaAppId';
import { XMLParser } from "fast-xml-parser";
import {  fetchWithTimeout } from './vespaUtils';
import { VespaServicesXml } from './model/VespaServicesXml';
import { VespaHostsXml } from './model/VespaHostsXml';
import { VespaStatus } from './model/VespaStatus';
import { VespaV2Metrics } from './model/VespaMetrics';
import { VespaDocTypesInfo } from './model/VespaDocTypeInfo';


export class VespaClusterInfo {

	clusterName: string = undefined;
	appId: VespaAppId = undefined;
	clusterList: VespaClusterList = undefined;
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



	async getDocInfo(): Promise<VespaDocTypesInfo> {

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ""
		});

		const appId = await VespaAppId.fetchAppId(vespaConfig);
		const status = await VespaStatus.fetchVespaStatus(vespaConfig);

		const services_xml = await VespaServicesXml.fetchServiceXml(vespaConfig, status, appId);

		const hosts_xml = await VespaHostsXml.fetchHostsXml(vespaConfig, status, appId);

		//outputChannel.appendLine("services_xml: " + JSON.stringify(services_xml));
		//outputChannel.appendLine("hosts_xml: " + JSON.stringify(hosts_xml));

		return VespaV2Metrics.fetchMetrics(vespaConfig)
			.then(v2Metrics => v2Metrics.getDocInfo(services_xml, hosts_xml));
	}


}

export const vespaClusterInfo = new VespaClusterInfo();