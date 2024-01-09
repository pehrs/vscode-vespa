import { vespaConfig } from '../VespaConfig';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaAppId } from './VespaAppId';

export interface VespaSchemaField {
	name: string;
	type: string;
	alias: string[];
	attribte: boolean;
	index : boolean;
}

export interface VespaSchemaFieldSet {
	name: string;
	field: string[];
}

export interface VespaSchemaSummaryField {
	name: string;
	type: string;
	dynamic: boolean;
}

export interface VespaSchemaSummaryClass {
	name: string;
	field: VespaSchemaSummaryField[];
}

export interface VespaSchemaRankProfileInput {
	name: string;
	type: string;
}

export interface VespaSchemaRankProfile {
	name: string;
	hasSummaryFeatures: boolean;
	hasRankFeatures: boolean;
	input: VespaSchemaRankProfileInput[];
}

export interface VespaSchema {
	name: string;
	field: VespaSchemaField[];
	fieldSet: VespaSchemaFieldSet[];
	summaryClass: VespaSchemaSummaryClass[];
	rankProfile: VespaSchemaRankProfile[];
}

export class VespaSchemaConfig {
	schema: VespaSchema[];

	constructor(data: any) {
		this.schema = data.schema;
	}

	static async fetchSchemas(configEndpoint: string, appId: VespaAppId, configid: string): Promise<VespaSchemaConfig> {
		// const configEndpoint: string = vespaConfig.configEndpoint();
		// const configid = storageConfig.configid;
		const schemaListUrl = `${configEndpoint}/config/v2/tenant/${appId.tenant}/application/${appId.application}/search.config.schema-info/${configid}/search/cluster.${configid}`;
		const timeout = vespaConfig.httpTimeoutMs();
	
		// outputChannel.appendLine(`Getting Schemas for ${configid} from ${configEndpoint}`);
		return fetchWithTimeout(schemaListUrl, timeout)
			.then(response => response.json()
				.then(v => new VespaSchemaConfig(v)));		
	}
}

