import { vespaConfig } from '../VespaConfig';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaStatus } from './VespaStatus';

export class VespaAppId {
	tenant: string;
	application: string;
	instance: string;

	constructor(tenant: string, application: string, instance: string) {
		this.tenant = tenant;
		this.application = application;
		this.instance = instance;
	}

	contentPathPrefix(environment: string, region: string): string {
		return `/application/v2/tenant/${this.tenant}/application/${this.application}/environment/${environment}/region/${region}/instance/${this.instance}/content`;
	}


	getVespaContentURL(endpoint: string, status: VespaStatus, contentPath: string): URL {
		const url = `${endpoint}${this.contentPathPrefix(status.environment, status.region)}/${contentPath}`;
		return new URL(url);
	}


	static fetchAppId(configEndpoint: string): Promise<VespaAppId> {
		const appIdUrl = `${configEndpoint}/config/v1/cloud.config.application-id`;
		const timeoutMs = vespaConfig.httpTimeoutMs();

		// outputChannel.appendLine("Getting Vespa config from " + configEndpoint);
		return fetchWithTimeout(appIdUrl, timeoutMs)
			.then(response => response.json()
				.then((v:any) => new VespaAppId(v.tenant, v.application, v.instance)));
	}

}

