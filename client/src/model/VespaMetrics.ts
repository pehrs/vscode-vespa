import { VespaConfig } from '../VespaConfig';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaAppId } from './VespaAppId';
import { VespaDocInfo, VespaDocTypesInfo } from './VespaDocTypeInfo';
import { VespaHostsXml } from './VespaHostsXml';
import { VespaServicesXml } from './VespaServicesXml';
import { VespaStatus } from './VespaStatus';



// const metricsUrl = new URL(`${configEndpoint}/metrics/v2/values`);
const metricsConfigPath = "/metrics/v2/values";

export class VespaV2Metric {

	values: Map<string, number>;
	dimensions: Map<string, string>;

	constructor(data: any) {
		if (data.values) {
			this.values = data.values;
		}
		if (data.dimensions) {
			this.dimensions = data.dimensions;
		}
	}
}

export class VespaV2MetricsService {
	name: string;
	timestamp: number;
	status: { code: string, description: string };
	metrics: VespaV2Metric[];

	constructor(data: any) {
		this.name = data.name;
		this.timestamp = data.timestamp;
		this.status = data.status;

		this.metrics = (data.metrics as any[]).map(metric => new VespaV2Metric(metric));

	}

	static parse(data: any[]): VespaV2MetricsService[] {
		return data.map(service => new VespaV2MetricsService(service));
	}

}

export class VespaV2MetricsNode {
	hostname: string;
	services: VespaV2MetricsService[];

	constructor(data: any) {
		this.hostname = data.hostname;
		this.services = VespaV2MetricsService.parse(data.services as any[]);
	}
}


export class VespaV2Metrics {

	nodes: VespaV2MetricsNode[] = [];

	constructor(data: any) {
		(data.nodes as any[]).map(node => {
			this.nodes.push(new VespaV2MetricsNode(node));
		});
	}

	static parse(data: any): VespaV2Metrics {

		if (data === undefined || data.nodes === undefined) {
			return undefined;
		}

		return new VespaV2Metrics(data);
	}

	getDistributionKey(servicesXml: VespaServicesXml, hostsXml: VespaHostsXml, hostname: string): string {
		const aliases: string[] = hostsXml.getAliasesForName(hostname);
		const distributionKey = aliases.map(alias => servicesXml.getDistributionKeyForAlias(alias)).shift();
		return distributionKey;
	}

	getDocInfo(servicesXml: VespaServicesXml, hostsXml: VespaHostsXml): VespaDocTypesInfo {

		const info = new VespaDocTypesInfo();

		this.nodes.map(node => {
			const hostname = node.hostname;
			node.services.map(service => {
				service.metrics.map(metric => {
					const values = metric.values;
					const dimensions = metric.dimensions;
					if (values && dimensions) {
						// 
						if (dimensions["documenttype"]) {
							const docTypeName = dimensions["documenttype"];
							if (values["content.proton.documentdb.documents.active.last"]) {
								const docCount =
									parseInt(values["content.proton.documentdb.documents.active.last"]);
								const memUsageBytes =
									parseInt(values["content.proton.documentdb.memory_usage.allocated_bytes.last"]);
								const diskUsageBytes =
									parseInt(values["content.proton.documentdb.disk_usage.last"]);
								const tansactionLogUsageBytes =
									parseInt(values["content.proton.transactionlog.disk_usage.last"]);
								const matchRate =
									parseFloat(values["content.proton.documentdb.matching.docs_matched.rate"]);

								const docInfo = new VespaDocInfo(
									hostname,
									docCount,
									memUsageBytes,
									diskUsageBytes,
									tansactionLogUsageBytes,
									matchRate
								);

								const distributionKey = this.getDistributionKey(servicesXml, hostsXml, hostname);
								info.getOrCreateDocType(docTypeName).addGroup(distributionKey, docInfo);
							}

						}
					}
				});
			});
		});

		return info;
	}


	static fetchMetrics(vespaConfig: VespaConfig): Promise<VespaV2Metrics> {
		const metricsUrl = new URL(`${vespaConfig.configEndpoint()}/metrics/v2/values`);
		return fetchWithTimeout(metricsUrl, vespaConfig.queryTimeoutMs())
			.then(urlResponse => urlResponse.json())
			.then(json => VespaV2Metrics.parse(json));
	}
}