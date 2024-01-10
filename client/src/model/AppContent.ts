import { vespaConfig } from '../VespaConfig';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaAppId } from './VespaAppId';
import { VespaStatus } from './VespaStatus';



export class AppContent {

	configEndpoint: string = undefined;
	status: VespaStatus = undefined;
	appId: VespaAppId = undefined;

	async fetchAppDir(configEndpoint: string, path: string): Promise<string[]> {
		const timeoutMs = vespaConfig.httpTimeoutMs();

		if(this.status === undefined) {
			this.status = await VespaStatus.fetchVespaStatus(configEndpoint);
		}
		if(this.appId === undefined) {
			this.appId = await VespaAppId.fetchAppId(configEndpoint);
		}

		const contentRoot = this.appId.getVespaContentURL(configEndpoint, this.status, "").toString();
		const contentPath = `${contentRoot}/${path}`;

		return fetchWithTimeout(contentPath, timeoutMs)
			.then(urlResponse => urlResponse.json())
			.then(files => (files as string[]).map(f => f.replace(contentRoot, "")));
	}

	async fetchAppFile(configEndpoint: string, path: string): Promise<any> {

		if(path.endsWith("/")) {
			return Promise.reject("Cannot get 'content' of a dir!");
		}

		const timeoutMs = vespaConfig.httpTimeoutMs();

		if(this.status === undefined) {
			this.status = await VespaStatus.fetchVespaStatus(configEndpoint);
		}
		if(this.appId === undefined) {
			this.appId = await VespaAppId.fetchAppId(configEndpoint);
		}

		const contentRoot = this.appId.getVespaContentURL(configEndpoint, this.status, "").toString();
		const contentPath = `${contentRoot}/${path}`;


		// Assuming text data :-)
		return fetchWithTimeout(contentPath, timeoutMs)
			.then(urlResponse => urlResponse.text());
	}
}