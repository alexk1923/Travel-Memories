import React from "react";
import bgImg from "../img/404bg.svg";

export default function NotFound() {
	return (
		<div className='w-full h-screen flex flex-col justify-center items-center'>
			<h1 className='lg:text-xl text-center font-bold'>
				This page doesn't exist, try again
			</h1>
			<img src={bgImg} className='w-full lg:w-3/4 xl:w-1/2' />
		</div>
	);
}
