import { XMLParser } from 'fast-xml-parser';
import { VespaAppId } from './VespaAppId';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaStatus } from './VespaStatus';
import { VespaConfig } from '../VespaConfig';

export class VespaHostsXml {

	// <alias, hostname>
	hosts: Map<string, string> = new Map();

	constructor(hosts: Map<string, string>) {
		this.hosts = hosts;
	}

	getAliasesForName(name: string): string[] {
		return Array.from(this.hosts.entries())
			.filter(([key, value]) => value === name)
			.flatMap(([key, value]) => key);
	}

	static parse(data: any): VespaHostsXml {

		if (data.hosts.host === undefined) {
			return undefined;
		}

		const map = new Map<string, string>();
		data.hosts.host.map(host => {
			if (Array.isArray(host.alias)) {
				(data.hosts.host as any[]).map(node => map.set(node.alias, node.name));
			} else {
				map.set(data.hosts.host.alias, data.hosts.host.name);
			}
		});

		return new VespaHostsXml(map);
	}

	static parseXml(xml: string): VespaHostsXml {
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ""
		});

		const serviceXmlObj = parser.parse(xml);

		return VespaHostsXml.parse(serviceXmlObj);
	}


	static fetchHostsXml(vespaConfig: VespaConfig, status: VespaStatus, appId: VespaAppId): Promise<VespaHostsXml> {
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ""
		});
		return fetchWithTimeout(appId.getVespaContentURL(vespaConfig.configEndpoint(), status, "hosts.xml"), vespaConfig.queryTimeoutMs())
			.then(urlResponse => urlResponse.text())
			.then(xmlText => VespaHostsXml.parseXml(xmlText));
	}

}

