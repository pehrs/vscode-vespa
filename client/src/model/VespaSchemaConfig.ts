export interface SchemaField {
	name: string;
	type: string;
	alias: string[];
	attribte: boolean;
	index : boolean;
}

export interface SchemaFieldSet {
	name: string;
	field: string[];
}

export interface SchemaSummaryField {
	name: string;
	type: string;
	dynamic: boolean;
}

export interface SchemaSummaryClass {
	name: string;
	field: SchemaSummaryField[];
}

export interface SchemaRankProfileInput {
	name: string;
	type: string;
}

export interface SchemaRankProfile {
	name: string;
	hasSummaryFeatures: boolean;
	hasRankFeatures: boolean;
	input: SchemaRankProfileInput[];
}

export interface Schema {
	name: string;
	field: SchemaField[];
	fieldSet: SchemaFieldSet[];
	summaryClass: SchemaSummaryClass[];
	rankProfile: SchemaRankProfile[];
}

export interface SchemaConfig {
	schema: Schema[];
}