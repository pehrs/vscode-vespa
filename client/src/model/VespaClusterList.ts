
export interface StorageClusterConfig {
	name: string;
	configid: string;
}

export interface VespaClusterList {
	storage: StorageClusterConfig[]
}