import React from "react";

export default function LoginCard() {
	return (
		<div className="hidden relative h-full lg:block lg:bg-[url('img/mountain.jpg')] lg:bg-cover lg:bg-center lg:rounded-lg lg:bg-no-repeat">
			<div className='hidden lg:flex flex-col justify-center w-[80%] aspect-square text-center font-bold text-white border-2 md:text-lg backdrop-blur-sm absolute left-[10%] top-1/2 transform -translate-y-1/2'>
				<h1 className='md:3xl lg:text-5xl  xlg:text-5xl p-3 drop-shadow-xl'>
					Join the community.
				</h1>
				<h2 className='md:text-md lg:text-xl text-slate-50 drop-shadow-2xl'>
					Add new travel places from all around the world
				</h2>
			</div>
		</div>
	);
}
