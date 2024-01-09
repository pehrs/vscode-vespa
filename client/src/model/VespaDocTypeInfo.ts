export class VespaDocInfo {
	hostname: string;
	docCount: number;
	memUsageBytes: number;
	diskUsageBytes: number;
	transactionLogUsageBytes: number;
	matchRate: number;

	constructor(hostname: string, docCount: number, memUsageBytes: number, diskUsageBytes: number, transactionLogUsageBytes: number, matchRate: number) {
		this.hostname = hostname;
		this.docCount = docCount;
		this.memUsageBytes = memUsageBytes;
		this.diskUsageBytes = diskUsageBytes;
		this.transactionLogUsageBytes = transactionLogUsageBytes;
		this.matchRate = matchRate;
	}
}

export class VespaDocTypeInfo {
	name: string;
	total: VespaDocInfo = undefined;
	groupDistributionKeys: Set<string> = new Set();
	groups: Map<string, VespaDocInfo> = new Map();

	constructor(name: string) {
		this.name;
	}

	getGroupDistrubutionKeys(): string[] {
		return Array.from(this.groupDistributionKeys);
	}

	setTotal(total: VespaDocInfo): void {
		this.total = total;
	}

	getTotal(): VespaDocInfo {
		let docCount: number = 0;
		let memUsageBytes: number = 0;
		let diskUsageBytes: number = 0;
		let transactionLogUsageBytes: number = 0;
		let matchRate: number = 0;
		Array.from(this.groups.entries()).map(([name, group]) => {
			docCount += group.docCount;
			memUsageBytes += group.memUsageBytes;
			diskUsageBytes += group.diskUsageBytes;
			transactionLogUsageBytes += group.transactionLogUsageBytes;
			matchRate += group.matchRate;
		});
		return new VespaDocInfo("total", docCount, memUsageBytes, diskUsageBytes, transactionLogUsageBytes, matchRate);
	}

	addGroup(distributionKeys: string, info: VespaDocInfo): void {
		this.groupDistributionKeys.add(distributionKeys);
		this.groups.set(distributionKeys, info);
		this.total = this.getTotal();
	}
}

export class VespaDocTypesInfo {
	docTypeNames: Set<string> = new Set();
	docTypes: Map<string, VespaDocTypeInfo> = new Map();

	getDocTypeNames() : string[] {
		return Array.from(this.docTypeNames);
	}

	getOrCreateDocType(name: string) {		
		if(this.docTypes.get(name) === undefined) {
			this.addDocType(name, new VespaDocTypeInfo(name));
		}		
		return this.docTypes.get(name);
	}

	addDocType(name: string, info: VespaDocTypeInfo): void {
		this.docTypeNames.add(name);
		this.docTypes.set(name, info);
	}

}