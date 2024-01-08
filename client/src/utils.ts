

export function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function fmtNum(num: number, digits: number): string {
	const units = ['k', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];
	let decimal = undefined;

	for (let i = units.length - 1; i >= 0; i--) {
		decimal = Math.pow(1000, i + 1);

		if (num <= -decimal || num >= decimal) {
			return +(num / decimal).toFixed(digits) + " " + units[i];
		}
	}
	return "" + num.toFixed(digits);
}

export function fmtBytes(num: number, digits: number): string {
	const si_units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
	let decimal = undefined;

	for (let i = si_units.length - 1; i >= 0; i--) {
		decimal = Math.pow(1000, i + 1);

		if (num <= -decimal || num >= decimal) {
			return +(num / decimal).toFixed(digits) + " " + si_units[i] + "B";
		}
	}
	return "" + num + " B";
}

export function formatNumber(value) {
	return Math.round(value).toLocaleString().replace(/,/g, " ");
}

export function durationSeconds(timeExpr: string): number {
	const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(timeExpr);
	return 3600 * (parseInt(match[1]) || 0)
		+ 60 * (parseInt(match[2]) || 0)
		+ (parseInt(match[3]) || 0);
}

export function durationMs(timeExpr: string): number {
	return 1000 * durationSeconds(timeExpr);
}


const mapToObj = m => {
	return Array.from(m).reduce((obj, [key, value]) => {
		obj[key] = value;
		return obj;
	}, {});
};

// NOTE: This will only work one way :-)
export function jsonMapReplacer(key, value) {
	if (value instanceof Map) {
		return mapToObj(value);
	}
	if (value instanceof Set) {
		return Array.from(value);
	} else {
		return value;
	}
}

