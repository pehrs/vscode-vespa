import {LanguageFn, HLJSApi} from 'highlight.js';

export function jsonLang(hljs:HLJSApi) {
	const ATTRIBUTE = {
		className: 'attr',
		begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
		relevance: 1.01
	};
	const PUNCTUATION = {
		match: /[{}[\],:]/,
		className: "punctuation",
		relevance: 0
	};
	const LITERALS = [
		"true",
		"false",
		"null"
	];
	// NOTE: normally we would rely on `keywords` for this but using a mode here allows us
	// - to use the very tight `illegal: \S` rule later to flag any other character
	// - as illegal indicating that despite looking like JSON we do not truly have
	// - JSON and thus improve false-positively greatly since JSON will try and claim
	// - all sorts of JSON looking stuff
	const LITERALS_MODE = {
		scope: "literal",
		beginKeywords: LITERALS.join(" "),
	};

	return {
		name: 'JSON',
		keywords: {
			literal: LITERALS,
		},
		contains: [
			ATTRIBUTE,
			PUNCTUATION,
			hljs.QUOTE_STRING_MODE,
			LITERALS_MODE,
			hljs.C_NUMBER_MODE,
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE
		],
		illegal: '\\S'
	};
}