import type { FC, ReactNode } from 'react';
import { useState } from 'react'
import type { BackgroundOptions } from './ThemeContext';
import ThemeContext from './ThemeContext'

const ThemeContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState<BackgroundOptions>({
		name: '~tan-50',
		isNamed: true,
	});
  const [textColor, setTextColor] = useState('~black');

  const changeCurrentBackground = (options: BackgroundOptions) => {
    setBackground(options);
  }

	const changeCurrentTextColor = (newTextColor: string) => {
		setTextColor(newTextColor);
	}

  return <ThemeContext.Provider 
		value={{
			currentBackground: background,
			changeCurrentBackground,
			currentTextColor: textColor,
			changeCurrentTextColor
		}}>
		{children}
	</ThemeContext.Provider>
}

export default ThemeContextWrapper