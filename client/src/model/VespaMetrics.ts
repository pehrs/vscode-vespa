import { XMLParser } from 'fast-xml-parser';
import { vespaConfig } from '../VespaConfig';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaDocInfo, VespaDocTypesInfo } from './VespaDocTypeInfo';
import { VespaHostsXml } from './VespaHostsXml';
import { VespaServicesXml } from './VespaServicesXml';
import { VespaAppId } from './VespaAppId';
import { VespaStatus } from './VespaStatus';



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
		if (hostsXml === undefined) {
			return "0";
		}
		const aliases: string[] = hostsXml.getAliasesForName(hostname);
		const distributionKey = aliases.map(alias => servicesXml.getDistributionKeyForAlias(alias)).shift();
		return distributionKey;
	}

	getDocInfo(servicesXml: VespaServicesXml, hostsXml: VespaHostsXml): VespaDocTypesInfo {

		const info = new VespaDocTypesInfo();

		this.nodes.forEach(node => {
			const hostname = node.hostname;
			node.services.forEach(service => {
				service.metrics.forEach(metric => {
					const metricValues = metric.values;
					const dimensions = metric.dimensions;
					if (metricValues && dimensions) {
						if (dimensions["documenttype"]) {
							const docTypeName = dimensions["documenttype"];
							if (metricValues['content.proton.documentdb.documents.active.last'] >= 0) {
								const docCount =
									parseInt(metricValues["content.proton.documentdb.documents.active.last"]);
								const memUsageBytes =
									parseInt(metricValues["content.proton.documentdb.memory_usage.allocated_bytes.last"]);
								const diskUsageBytes =
									parseInt(metricValues["content.proton.documentdb.disk_usage.last"]);
								const tansactionLogUsageBytes =
									parseInt(metricValues["content.proton.transactionlog.disk_usage.last"]);
								const matchRate =
									parseFloat(metricValues["content.proton.documentdb.matching.docs_matched.rate"]);

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


	static fetchMetrics(configEndpoint: string): Promise<VespaV2Metrics> {
		const timeoutMs = vespaConfig.httpTimeoutMs();

		const metricsUrl = new URL(`${configEndpoint}/metrics/v2/values`);
		return fetchWithTimeout(metricsUrl, timeoutMs)
			.then(urlResponse => urlResponse.json())
			.then(json => VespaV2Metrics.parse(json));
	}

	static async fetchDocInfo(configEndpoint: string): Promise<VespaDocTypesInfo> {

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ""
		});

		const appId = await VespaAppId.fetchAppId(configEndpoint);
		if (appId.application === undefined) {
			return Promise.resolve(new VespaDocTypesInfo());
		}
		const status = await VespaStatus.fetchVespaStatus(configEndpoint);

		const services_xml = await VespaServicesXml.fetchServiceXml(configEndpoint, status, appId);

		const hosts_xml = await VespaHostsXml.fetchHostsXml(configEndpoint, status, appId);

		//outputChannel.appendLine("services_xml: " + JSON.stringify(services_xml));
		//outputChannel.appendLine("hosts_xml: " + JSON.stringify(hosts_xml));

		return VespaV2Metrics.fetchMetrics(configEndpoint)
			.then(v2Metrics => {
				if (v2Metrics === undefined) {
					return new VespaDocTypesInfo();
				} else {
					return v2Metrics.getDocInfo(services_xml, hosts_xml);
				}
			});
	}


}