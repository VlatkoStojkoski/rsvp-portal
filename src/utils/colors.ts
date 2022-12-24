import { colors as customColors } from '../styles/theme';
import tailwindColors from 'tailwindcss/colors';
import Color from 'color';

type ColRecord = any;

export function nameToColor(name: string): string | undefined {
	name = name.replace(/^\~/, '');

	if (name == 'transparent') return '#00000000';
	if (name == 'black') return '#000';
	if (name == 'white') return '#fff';

	const colCol = name.slice(0, name.lastIndexOf('-'));
	const colMod = name.slice(name.lastIndexOf('-') + 1);
	let colorDir: ColRecord = {};

	if ((tailwindColors as ColRecord)[colCol]) {
		colorDir = tailwindColors as ColRecord;
	} else if ((customColors as ColRecord)[colCol]) {
		colorDir = customColors as ColRecord;
	} else {
		console.error('Unknown color', name, colCol, colMod, colorDir);
		return undefined;
	}

	return colorDir[colCol][colMod];
}

export const isNamedColor = (color: string): boolean => {
	return color.startsWith('~');
}

export const colorGradients: {
	frog: [string, string]
} & Record<string, [string, string]> = {
	frog: ['~frog-50', '~frog-200'],
	'rich-blue': ['~rich-blue-200', '~rich-blue-400'],
	rose: ['~rose-500', '~rose-700']
}

export const getTextColor = (color: string): string => {
	const luminance = new Color(color).luminosity();

	return luminance > 0.2 ? '~black' : '~white';
}

export const colorOrDefault = (color: string, defaultColor: string): string => {
	color = color.replace(/^\~/, '');

	// console.log('colorOrDefault', color, defaultColor, nameToColor(color), nameToColor(defaultColor));

	return nameToColor(color) || nameToColor(defaultColor) || '#000000';
}