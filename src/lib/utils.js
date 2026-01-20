import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const normalizeList = (value) => {
	if (!value) return [];

	if (Array.isArray(value)) return value;

	return value.split(/\s+/);
};

export const cn = (...inputs) => {
	return twMerge(clsx(inputs));
};

export const tailwindBreakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536
};

export const media = (query) => {
	query = query.trim();

	let type, size;
	if (query.startsWith('max-')) {
		type = 'max-width';
		size = query.slice(4);
	} else if (query.startsWith('min-')) {
		type = 'min-width';
		size = query.slice(4);
	} else {
		throw new Error(`Invalid media query format: ${query}`);
	}

	const px = tailwindBreakpoints[size];
	if (!px) throw new Error(`Unknown Tailwind size: ${size}`);

	return window.matchMedia(`(${type}: ${px}px)`).matches;
}