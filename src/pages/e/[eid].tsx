import Color from 'color';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { z } from 'zod';
import ThemeContext from '../../context/ThemeContext';
import { colorGradients, getTextColor, nameToColor } from '../../utils/colors';
import { trpc } from '../../utils/trpc';
import emojiData from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';
import Link from 'next/link';

const Event = () => {
	const {query: {eid}} = useRouter();
	const {mutate: getEvent, data: eventData, isSuccess: isGetEventSuccess} = trpc.events.getEvent.useMutation();
	const {mutate: addGuest, isSuccess: isAddGuestSuccess} = trpc.events.addGuest.useMutation();
	const [colorGradient, setColorGradient] = React.useState<[string, string]>(['#000', '#']);
	const { changeCurrentTextColor, changeCurrentBackground } = useContext(ThemeContext);
	const [name, setName] = useState('');
	const [emoji, setEmoji] = useState('');

	React.useEffect(() => {
		if (!isAddGuestSuccess) return;

		getEvent({
			id: eid as string,
		});

		setName('');
		setEmoji('');
	}, [isAddGuestSuccess]);

	React.useEffect(() => {
		if (!eid || !z.string().safeParse(eid).success) return;

		getEvent({
			id: eid as string,
		});
	}, [eid, getEvent]);

	React.useEffect(() => {
		if (!eventData || !colorGradient) return;

		const currGradient = colorGradients[eventData.color] || colorGradients.frog;
		setColorGradient(currGradient);

		const gradientColors = currGradient
			.map((name) => Color(nameToColor(name)).hex());

		const lightestColIdx = Color(gradientColors[0]).luminosity() < Color(gradientColors[1]).luminosity() ? 0 : 1;
		const lightestCol = gradientColors[lightestColIdx];

		setColorGradient([gradientColors[lightestColIdx] as string, gradientColors[(lightestColIdx === 0 ? 1 : 0)] as string]); 

		changeCurrentTextColor(getTextColor(Color(lightestCol).hex()));

		changeCurrentBackground({
			css: `linear-gradient(160deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
			isNamed: false,
		});
	}, [eventData]);

	return (isGetEventSuccess && eventData && eid) && (
		<div className="relative px-6 lg:px-8">
			<div className="mx-auto max-w-screen-xl w-full min-h-screen pt-24">
				<h1 className='text-4xl sm:text-5xl font-bold font-heading'>
					{eventData.title}
				</h1>
				
				<p className='text-xl sm:text-2xl mt-1'>
					{eventData.description}
				</p>

				<div className='flex flex-row flex-wrap gap-5 mt-3'>
					<TextWithIcon 
						icon={<svg width='1.5rem' height='1.5rem' viewBox="0 0 362.13 362.13"><g><path fill='currentColor' d="m181.065,0c-75.532,0-136.981,61.45-136.981,136.981 0,31.155 21.475,76.714 63.827,135.411 30.619,42.436 60.744,75.965 62.011,77.372l11.144,12.367 11.144-12.367c1.267-1.406 31.392-34.936 62.011-77.372 42.352-58.697 63.827-104.255 63.827-135.411-0.001-75.531-61.451-136.981-136.983-136.981zm0,316.958c-37.733-44.112-106.981-134.472-106.981-179.977 0-58.989 47.991-106.981 106.981-106.981s106.981,47.992 106.981,106.981c0.001,45.505-69.248,135.865-106.981,179.977z"/><circle fill='currentColor' cx="181.065" cy="136.982" r="49.696"/></g></svg>}
					><Location location={eventData.location} /></TextWithIcon>
					<TextWithIcon 
						icon={<svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='currentColor' d="m22 2.25h-3.25v-1.5c-.014-.404-.344-.726-.75-.726s-.736.322-.75.725v.001 1.5h-4.5v-1.5c-.014-.404-.344-.726-.75-.726s-.736.322-.75.725v.001 1.5h-4.5v-1.5c-.014-.404-.344-.726-.75-.726s-.736.322-.75.725v.001 1.5h-3.25c-1.104 0-2 .895-2 1.999v17.75c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2v-17.75c0-1.104-.896-1.999-2-1.999zm.5 19.75c0 .276-.224.499-.499.5h-20.001c-.276 0-.5-.224-.5-.5v-17.75c.001-.276.224-.499.5-.499h3.25v1.5c.014.404.344.726.75.726s.736-.322.75-.725v-.001-1.5h4.5v1.5c.014.404.344.726.75.726s.736-.322.75-.725v-.001-1.5h4.5v1.5c.014.404.344.726.75.726s.736-.322.75-.725v-.001-1.5h3.25c.276 0 .499.224.499.499z"/><path fill='currentColor' d="m5.25 9h3v2.25h-3z"/><path fill='currentColor' d="m5.25 12.75h3v2.25h-3z"/><path fill='currentColor' d="m5.25 16.5h3v2.25h-3z"/><path fill='currentColor' d="m10.5 16.5h3v2.25h-3z"/><path fill='currentColor' d="m10.5 12.75h3v2.25h-3z"/><path fill='currentColor' d="m10.5 9h3v2.25h-3z"/><path fill='currentColor' d="m15.75 16.5h3v2.25h-3z"/><path fill='currentColor' d="m15.75 12.75h3v2.25h-3z"/><path fill='currentColor' d="m15.75 9h3v2.25h-3z"/></svg>}
					>{eventData.date.toLocaleDateString()}</TextWithIcon>
					<TextWithIcon 
						icon={<svg width="1.5rem" height="1.5rem" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path fill='currentColor' d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 15.7187 30.5312 L 27.9765 30.5312 C 28.8905 30.5312 29.6171 29.8281 29.6171 28.8906 L 29.6171 13.0937 C 29.6171 12.1797 28.8905 11.4766 27.9765 11.4766 C 27.0624 11.4766 26.3593 12.1797 26.3593 13.0937 L 26.3593 27.2734 L 15.7187 27.2734 C 14.8046 27.2734 14.1014 27.9766 14.1014 28.8906 C 14.1014 29.8281 14.8046 30.5312 15.7187 30.5312 Z"/></svg>}
					>{eventData.date.toLocaleTimeString()}</TextWithIcon>
				</div>
				
				<h2 className='text-xl font-semibold mt-10 mb-2'>You&apos;re attending?</h2>
				<div className="flex flex-col xs:flex-row gap-3 gap-y-2 h-fit">
					<input
						type='text'
						className='flex-shrink min-w-0 text-lg sm:text-xl rounded-md px-3 py-1 text-black'
						placeholder='Your name'
						value={name}
						onChange={(ev) => setName(ev.target.value)} />
					<EmojiInput color={Color(colorGradient[0])} onChange={setEmoji} value={emoji} />
				</div>
				<button className='text-lg sm:text-xl px-3 py-1 rounded-md mt-3' style={{
					background: Color(colorGradient[0]).saturate(0.75).darken(0.3).hex()
				}} onClick={() => {
					if(!name)
						return alert('Please enter your name');
					
					if(!emoji)
						return alert('Please select an emoji');
						
					addGuest({name, emoji, eventId: eid as string});
				}}>
					Submit
				</button>
				
				<h2 className='text-xl font-semibold mt-10 mb-2'>Guests</h2>
				<ul>
					{[...(eventData.guests.split(',') || [])].map((guest, index) => {
						if(!guest.match('.+#.+'))
							return;

						return (
							<li key={index} className='text-lg sm:text-xl'>
								<span className='inline-block mr-2 w-[2.5ch]'>{guest.split('#')[1]}</span>
								{guest.split('#')[0]}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Event;

const Location: React.FC<{
	location: string
}> = ({
	location
}) => {
	const [match, setMatch] = useState<[string, string] | []>([]);

	useEffect(() => {
		const locationMatch = location.split('](');
		if(!locationMatch[0] || !locationMatch[1]) {
			return;
		}
		const label = locationMatch[0].replace(/^\[/, '');
		const url = locationMatch[1].replace(/\)$/, '');
		setMatch([label, url]);
	}, []);

	return match.length === 2 ? (
		<Link href={match[1]} className='underline px-1 hover:bg-neutral-50 hover:text-stone-900'>
			{match[0]}
		</Link>
	) : (
		<>{location}</>
	);
};

const TextWithIcon: React.FC<{
	icon: React.ReactNode,
	children: React.ReactNode
}> = ({
	icon,
	children
}) => (
	<div className='flex flex-shrink-0 text-base sm:text-lg my-auto h-fit items-center'>
		<div className="block h-full">
			{icon}
		</div>
		<span className='ml-2'>{children}</span>
	</div>
);

const EmojiInput: React.FC<{
	color: Color,
	value: string,
	onChange: (emoji: string) => void
}> = ({
	color,
	value: emoji,
	onChange
}) => {
	const [isPickerHidden, setIsPickerHidden] = useState(true);
	const [emojiVisual, setEmojiVisual] = useState('');
	const [isEmojiPickerHovered, setIsEmojiPickerHovered] = useState(false);

	return (
		<div className='relative'>
			<button
				className='text-2xl xs:text-xl bg-neutral-500 px-3 py-1 rounded-md' 
				onClick={() => setIsPickerHidden(!isPickerHidden)}
				style={{
					background: color.desaturate(0.25).darken(isEmojiPickerHovered ? 0.125 : 0).hex(),
				}}
				onMouseEnter={() => setIsEmojiPickerHovered(true)}
				onMouseLeave={() => setIsEmojiPickerHovered(false)}>
				{
					emoji ?
						<>{emojiVisual}</> :
						<>Select emoji...</>
				}
			</button>
			<div className="absolute top-[calc(100%+0.5rem)] left-0" style={{
				display: isPickerHidden ? 'none' : 'block'
			}}>
				<EmojiPicker data={emojiData} onEmojiSelect={async (emojiObj: any) => {
					setEmojiVisual(emojiObj.native);
					onChange(emojiObj.native);
				}} />
			</div>
		</div>
	);
}