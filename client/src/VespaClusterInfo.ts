import exp = require('constants');
import { vespaConfig } from './VespaConfig';
import { outputChannel, showError } from './extension';
import { VespaSchema, VespaSchemaConfig } from './model/VespaSchemaConfig';
import { StorageClusterConfig, VespaClusterList } from './model/VespaClusterList';
import { VespaAppId } from './model/VespaAppId';
import { fetchWithTimeout } from './vespaUtils';


export class VespaClusterInfo {

	clusterName: string = undefined;
	appId: VespaAppId = undefined;
	clusterList: VespaClusterList = undefined;
	clusterSchemas: Map<string, VespaSchema[]> = new Map();

	defaultConfigId() {
		return this.clusterList.storage[0].configid;
	}

	defaultClusterSchemas(): VespaSchema[] {
		return this.clusterSchemas.get(this.defaultConfigId());
	}

	fetchClusterList(): Promise<VespaClusterList> {
		const configEndpoint: string = vespaConfig.configEndpoint();
		const clusterListUrl = `${configEndpoint}/config/v2/tenant/${this.appId.tenant}/application/${this.appId.application}/cloud.config.cluster-list`;
		const timeout = vespaConfig.httpTimeoutMs();

		outputChannel.appendLine("Getting Cluster List from " + configEndpoint);
		return fetchWithTimeout(clusterListUrl, timeout)
			.then(response => response.json()
				.then(v => v as VespaClusterList));
	}


	fetchSchemas(storageConfig: StorageClusterConfig): Promise<VespaSchema[]> {
		const configEndpoint: string = vespaConfig.configEndpoint();
		const configid = storageConfig.configid;
		const schemaListUrl = `${configEndpoint}/config/v2/tenant/${this.appId.tenant}/application/${this.appId.application}/search.config.schema-info/${configid}/search/cluster.${configid}`;
		const timeout = vespaConfig.httpTimeoutMs();

		outputChannel.appendLine(`Getting Schemas for ${configid} from ${configEndpoint}`);
		return fetchWithTimeout(schemaListUrl, timeout)
			.then(response => response.json()
				.then(v => v as VespaSchemaConfig))
			.then(schemaConfig => {
				return schemaConfig.schema;
			});
	}

	refresh(): Promise<void> {
		if (this.clusterName == undefined || this.clusterName !== vespaConfig.vespaConfig.defaultCluster) {
			this.clusterName = vespaConfig.vespaConfig.defaultCluster;
			return VespaAppId.fetchAppId(vespaConfig.configEndpoint())
				.then(appId => this.appId = appId)
				.then(appId => {
					this.fetchClusterList()
						.then(clusterList => this.clusterList = clusterList)
						.then(clusterList => {
							clusterList.storage.map(storageConfig => {
								return this.fetchSchemas(storageConfig)
									.then((schemas: VespaSchema[]) => {
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

}

export const vespaClusterInfo = new VespaClusterInfo();