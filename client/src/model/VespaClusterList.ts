import { vespaConfig } from '../VespaConfig';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaAppId } from './VespaAppId';

export interface StorageClusterConfig {
	name: string;
	configid: string;
}

export class VespaClusterList {
	storage: StorageClusterConfig[];

	constructor(data:any) {
		this.storage = data.storage as StorageClusterConfig[];
	}

	getDefaultConfigId() {
		return this.storage[0].configid;
	}

	static fetchVespaClusterList(configEndpoint: string, appId: VespaAppId): Promise<VespaClusterList> {
		// const configEndpoint: string = vespaConfig.configEndpoint();
		const clusterListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/cloud.config.cluster-list`;
		const timeout = vespaConfig.httpTimeoutMs();

		// outputChannel.appendLine("Getting Cluster List from " + configEndpoint);
		return fetchWithTimeout(clusterListUrl, timeout)
			.then(response => response.json()
				.then(v => new VespaClusterList(v)));
	}
}