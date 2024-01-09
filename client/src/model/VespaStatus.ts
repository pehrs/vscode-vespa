import { vespaConfig } from '../VespaConfig';
import { fetchWithTimeout } from '../vespaUtils';

export class VespaStatus {
	region: string;
	environment: string;
	versions: string[];

	constructor(data: any) {
		this.region = data.configserverConfig.region;
		this.environment = data.configserverConfig.environment;
		this.versions = data.modelVersions.modelVersions;
	}


	// http://localhost:19071/status
	static fetchVespaStatus(configEndpoint: string): Promise<VespaStatus> {	
		const timeoutMs = vespaConfig.httpTimeoutMs();

		return fetchWithTimeout(`${configEndpoint}/status`, timeoutMs)
			.then(urlResponse => urlResponse.json())
			.then(json => new VespaStatus(json));
	}
}