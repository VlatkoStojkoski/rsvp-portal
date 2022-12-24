import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { colorOrDefault } from '../utils/colors';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import ThemeContextWrapper from "../context/ThemeContextWrapper";
import type { NextComponentType } from "next";

const Content: React.FC<{
	Component: NextComponentType,
	pageProps: any
}> = ({
	Component,
	pageProps
}) => {
	const { currentBackground, currentTextColor } = useContext(ThemeContext);

	return (
		<main className='font-body min-h-screen pb-8' style={{
				background: currentBackground.isNamed ? colorOrDefault(currentBackground.name, '~tan-50') : currentBackground.css,
				color: colorOrDefault(currentTextColor, '~red-500'),
			}}>
			<Component {...pageProps} />
		</main>
	);
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
	pageProps: { session, ...pageProps },
}) => {
  return (
		<ThemeContextWrapper>
			<SessionProvider session={session}>
				<Content Component={Component} pageProps={pageProps} />
			</SessionProvider>
		</ThemeContextWrapper>
  );
};

export default trpc.withTRPC(MyApp);
