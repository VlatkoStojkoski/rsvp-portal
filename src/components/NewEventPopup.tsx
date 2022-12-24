import React from 'react'
import { colorGradients, nameToColor } from '../utils/colors';

const NewEventPopup: React.FC<{
	createEvent: (options: {
		name: string,
		description: string,
		color: string,
		location: string,
		date: Date
	}) => void;
}> = ({createEvent}) => {
	const [linkAdded, setLinkAdded] = React.useState(false);
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [color, setColor] = React.useState('rich-blue');
	const [location, setLocation] = React.useState('');
	const [locationLink, setLocationLink] = React.useState('');
	const [date, setDate] = React.useState<Date>(new Date());

	return (
		<>
			<h1 className='text-2xl sm:text-3xl font-bold text-center'>New Event</h1>

			<form className='flex flex-col gap-3 mt-2 max-w-xs mx-auto'>
				<div>
					<label htmlFor='name'>Event Name</label>
					<input
						type='text'
						name='name'
						id='name'
						className='block border-stone-600 border-[1px] px-2 py-1'
						placeholder="Your event's name..."
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='description'>Event Description</label>
					<textarea
						name='description'
						id='description'
						className='block border-stone-600 border-[1px] px-2 py-1'
						placeholder="Your event's description..."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='colorScheme'>Color Scheme</label>
					<select
						name='colorScheme'
						id='colorScheme'
						className='block px-2 py-1 text-white cursor-pointer'
						style={{
							background: `linear-gradient(90deg, ${colorGradients[color]?.map(col => nameToColor(col)).join(', ')})`
						}}
						value={color}
						onChange={(e) => setColor(e.target.value)}
					>
						{Object.keys(colorGradients).map((color) => {
							const formattedColor = color.replace(/-/g, ' ');

							return (
								<option key={color} value={color}>
									{formattedColor[0]?.toUpperCase() + formattedColor.slice(1)}
								</option>
							)
						})}
					</select>
				</div>
				<div>
					<label htmlFor='location'>Location</label>
					<input
						type='text'
						name='location'
						id='location'
						className='block border-stone-600 border-[1px] px-2 py-1'
						placeholder="Your event's location..."
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
					{
						linkAdded &&
						<input
							type='url'
							name='locationLink'
							id='locationLink'
							className='block border-stone-600 border-[1px] px-2 py-1 mt-1'
							placeholder="Your event's location link..."
							value={locationLink}
							onChange={(e) => setLocationLink(e.target.value)}
						/>
					}
					<button className='mt-1 underline hover:bg-stone-300 px-2 py-1' onClick={(e) => {
						e.preventDefault();
						setLinkAdded(!linkAdded);
					}}>
						{
							linkAdded ? '- Remove Link' : '+ Add Link'
						}
					</button>
				</div>
				<div>
					<label htmlFor='date'>Date</label>
					<input
						type='date'
						name='date'
						id='date'
						className='block border-stone-600 border-[1px] px-2 py-1'
						value={date.toISOString().split('T')[0]}
						onChange={(e) => setDate(new Date(e.target.value))}
					/>
				</div>
				<div>
					<label htmlFor='time'>Time</label>
					<input
						type='time'
						name='time'
						id='time'
						className='block border-stone-600 border-[1px] px-2 py-1'
						value={((date.toISOString() as string).split('T') as [string, string])[1].split('.')[0] || '00:00'}
						onChange={(e) => {
							const [hours, minutes] = e.target.value.split(':') as [string, string];
							setDate(new Date(date.setHours(+hours, +minutes)));
						}}
					/>
				</div>
				<button 
					className='bg-stone-600 text-white px-2 py-1 rounded-md hover:bg-stone-500 max-w-xs'
					onClick={(e) => {
						e.preventDefault();
						createEvent({
							name,
							description,
							color,
							location: linkAdded ? `[${location}](${locationLink})`: location,
							date
						});
					}}>
					Create Event
				</button>
			</form>
		</>
	);
}

export default NewEventPopup;