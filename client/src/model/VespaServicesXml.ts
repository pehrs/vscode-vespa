import { XMLParser } from 'fast-xml-parser';
import { fetchWithTimeout } from '../vespaUtils';
import { VespaAppId } from './VespaAppId';
import { VespaStatus } from './VespaStatus';
import { VespaConfig } from '../VespaConfig';

export class HostAlias {
	hostalias: string;
	jvmOptions: string = undefined;

	constructor(data: any) {
		this.hostalias = data.hostalias;
		if ("jvm-options" in data) {
			this.jvmOptions = data["jvm-options"];
		}
	}
}

function parseHostAliases(data: any): HostAlias[] {
	if (data === undefined) {
		return [];
	}
	if (Array.isArray(data)) {
		return (data as any[]).map(configserver => new HostAlias(configserver));
	} else {
		return [new HostAlias(data)];
	}
}

export class AdminConfig {
	configservers: HostAlias[];
	clusterControllers: HostAlias[];
	slobroks: HostAlias[];
	adminserver: HostAlias;

	constructor(configservers: HostAlias[], clusterControllers: HostAlias[], slbroks: HostAlias[], adminserver: HostAlias) {
		this.configservers = configservers;
		this.clusterControllers = clusterControllers;
		this.slobroks = slbroks;
		this.adminserver = adminserver;
	}
}


function parseAdminConfig(data: any): AdminConfig | undefined {

	if (data.services.admin === undefined) {
		return undefined;
	}
	const admin = data.services.admin;
	const configservers = admin.configservers.configserver;
	const clusterControllers = admin["cluster-controllers"]["cluster-controller"];
	const slobroks = admin.slobroks.slobrok;
	const adminserver = admin.adminserver;

	const adminConfig =
		new AdminConfig(parseHostAliases(configservers), parseHostAliases(clusterControllers), parseHostAliases(slobroks), new HostAlias(adminserver));

	return adminConfig;
}

export class ContainerConfig {
	containerId: string; // id
	nodes: HostAlias[];
	documentApi: boolean; // If property document-api is present?
	searchApi: boolean; // If property search is present

	constructor(data: any) {
		this.containerId = data.id;
		this.documentApi = "document-api" in data;
		this.searchApi = "search" in data;
		this.nodes = parseHostAliases(data.nodes.node);
	}
}

function parseContainerConfigs(data: any): ContainerConfig[] | undefined {
	if (data === undefined) {
		return undefined;
	}

	const containers = data.services.container;

	if (Array.isArray(containers)) {
		return (containers as any[]).map(container => new ContainerConfig(container));
	} else {
		return [new ContainerConfig(containers)];
	}
}

export class DocumentType {
	documentType: string; // document.type
	documentMode: string; // document.mode

	constructor(docData: any) {
		this.documentType = docData.type;
		this.documentMode = docData.mode;
	}

}

export class DocumentConfig {
	documentTypes: DocumentType[];
	documentProcessingCluster?: string; // document-processing.cluster

	constructor(docData: any) {
		const data = docData.document;
		if (Array.isArray(data)) {
			this.documentTypes = (data as any[]).map(doc => new DocumentType(doc));
		} else {
			this.documentTypes = [new DocumentType(data)];
		}
		this.documentProcessingCluster = ("document-processing" in docData) ? docData["document-processing"].cluster : undefined;
	}

}

export class ContentHostAlias {
	hostalias: string;
	distributionKey: string = undefined;

	constructor(data: any) {
		this.hostalias = data.hostalias;
		if ("distribution-key" in data) {
			this.distributionKey = data["distribution-key"];
		}
	}
}

function parseContentHostAliases(data: any): ContentHostAlias[] {
	if (data === undefined) {
		return [];
	}
	if (Array.isArray(data)) {
		return (data as any[]).map(node => new ContentHostAlias(node));
	} else {
		return [new ContentHostAlias(data)];
	}
}
export class ContentGroup {
	name: string;
	distributionKey: string;
	nodes: ContentHostAlias[];

	constructor(data: any) {
		this.name = data.name;
		this.distributionKey = data["distribution-key"];
		this.nodes = data.node.map(node => new ContentHostAlias(node));
	}
}
export class ContentGroupsConfig {
	distributionPartitions: string;
	groups: ContentGroup[];

	constructor(group: any) {
		this.distributionPartitions = group.distribution.partitions;
		this.groups = group.group.map(subGroup => new ContentGroup(subGroup));
	}

	getDistributionKeyForAlias(alias: string): string {
		const nodes = this.groups.flatMap(group => {
			return group.nodes.filter(n => n.hostalias === alias);
		});
		return nodes.shift().distributionKey;
	}

	getAllContentNodes(): ContentHostAlias[] {
		return this.groups.flatMap(group => group.nodes);
	}
}



export class ContentConfig {
	contentId: string; // id
	documentConfig: DocumentConfig;
	nodes?: ContentHostAlias[] = undefined;
	groupConfig?: ContentGroupsConfig = undefined;

	constructor(contentData: any) {
		this.contentId = contentData.id;
		if (contentData.nodes) {
			this.nodes = parseContentHostAliases(contentData.nodes.node);
		}
		if (contentData.group) {
			this.groupConfig = new ContentGroupsConfig(contentData.group);
		}
		this.documentConfig = new DocumentConfig(contentData.documents);
	}

	getDistributionKeyForAlias(alias: string) : string {
		if(this.nodes) {
			return this.nodes
				.find(cAlias => cAlias.hostalias === alias)
				.distributionKey;
		}
		this.groupConfig.getDistributionKeyForAlias(alias);
	}

	getAllContentNodes(): ContentHostAlias[] {
		if (this.nodes) {
			return this.nodes;
		}
		return this.groupConfig.getAllContentNodes();
	}
}


function parseContentConfig(data: any): ContentConfig | undefined {
	if (data === undefined) {
		return undefined;
	}

	const content = data.services.content;

	return new ContentConfig(content);
}

export class VespaServicesXml {

	adminConfig: AdminConfig = undefined;
	containerConfigs: ContainerConfig[] = undefined;
	contentConfig: ContentConfig = undefined;

	constructor(adminConfig: AdminConfig, containerConfigs: ContainerConfig[], contentConfig: ContentConfig) {
		this.adminConfig = adminConfig;
		this.containerConfigs = containerConfigs;
		this.contentConfig = contentConfig;
	}

	getDistributionKeyForAlias(alias: string) : string {
		return this.contentConfig.getDistributionKeyForAlias(alias);
	}

	static parse(data: any): VespaServicesXml {
		return new VespaServicesXml(
			parseAdminConfig(data),
			parseContainerConfigs(data),
			parseContentConfig(data));
	}

	static parseXml(xml: string): VespaServicesXml {
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ""
		});

		const serviceXmlObj = parser.parse(xml);

		return VespaServicesXml.parse(serviceXmlObj);
	}


	static fetchServiceXml(vespaConfig: VespaConfig, status: VespaStatus, appId: VespaAppId): Promise<VespaServicesXml> {
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: ""
		});
		return fetchWithTimeout(appId.getVespaContentURL(vespaConfig.configEndpoint(), status, "services.xml"), vespaConfig.queryTimeoutMs())
			.then(urlResponse => urlResponse.text())
			.then(xmlText => VespaServicesXml.parseXml(xmlText));
	}


}


