import React from "react";
import travelImg from "../img/travel1.jpg";

export default function Login() {
	return (
		<div className='text-xl w-full h-full flex justify-center items-center'>
			<div className='rounded-md bg-slate-50 dark:bg-slate-600 flex flex-col lg:flex-row justify-center items-center w-3/4 drop-shadow-md [&>*]:flex-1'>
				<form className='flex flex-col items-center justify-center [&>*]:p-4'>
					<input placeholder='Email' className='bg-transparent'></input>
					<input placeholder='Password' className='bg-transparent'></input>
					<button className='bg-sky-700 hover:bg-sky-900 w-1/4 font-bold text-white rounded-lg m-2'>
						Login
					</button>
				</form>
				<div className='h-full'>
					<img
						src={travelImg}
						alt=''
						className='w-full h-full relative object-cover'
					></img>
					<h1 className=' text-center text-white md:text-md lg:text-3xl font-bold absolute bottom-1/3'>
						Join the community to add new travel places all around the world
					</h1>
				</div>
			</div>
		</div>
	);
}
