import { createContext } from 'react';

export type BackgroundOptions = {
	name: string,
	isNamed: true,
} | {
	css: string,
	isNamed: false,
};

const defaultValue: {
	currentBackground: BackgroundOptions,
	changeCurrentBackground: (newBackground: BackgroundOptions) => void,
	currentTextColor: string,
	changeCurrentTextColor: (newTextColor: string) => void,
} = {
  currentBackground: {
		name: '~tan-50',
		isNamed: true,
	},
	changeCurrentBackground: (newBackground: BackgroundOptions) => {
		console.log('changed background to', newBackground);
	},
	currentTextColor: '~black',
	changeCurrentTextColor: (newTextColor: string) => {
		console.log('changed text color to', newTextColor);
	}
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;