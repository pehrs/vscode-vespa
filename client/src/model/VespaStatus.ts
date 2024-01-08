import { VespaConfig } from '../VespaConfig';
import { durationMs } from '../utils';
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
	static fetchVespaStatus(vespaConfig: VespaConfig): Promise<VespaStatus> {	
		return fetchWithTimeout(`${vespaConfig.configEndpoint()}/status`, vespaConfig.queryTimeoutMs())
			.then(urlResponse => urlResponse.json())
			.then(json => new VespaStatus(json));
	}
}