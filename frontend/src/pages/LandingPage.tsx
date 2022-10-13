import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import mapMarker from "../img/map-marker.svg";

export default function LandingPage() {
	const { user } = useUserContext();
	const navigate = useNavigate();

	return (
		<div className='text-white  flex flex-col h-screen bg-black'>
			<div className="flex-1 bg-[url('./img/landing-bg.jpg')] bg-center bg-cover flex w-full justify-center items-start">
				<button type='button' className='hidden'>
					Explore
				</button>
				<img
					src={whiteLogo}
					alt='next travel'
					className='w-[50%] custom-drop-shadow mt-5'
				/>
				<button type='button' className='hidden'>
					Login
				</button>
				<button type='button' className='hidden'>
					Register
				</button>
			</div>

			<div className='flex-[2] bg-gradient-to-b from-sky-700 h-[50%] to-sky-900/0 flex flex-col items-center'>
				<div className='flex flex-col items-center transform -translate-y-[15%]'>
					<img src={mapMarker} className='w-[50%]' />
					<div className='text-center w-[75%] [&>*]:py-2'>
						<h1 className='text-2xl'>
							<b>Do you know your next trip destination?</b>
						</h1>
						<p className='text-base text-white/75'>Choose from over x places</p>
					</div>
				</div>
				<button
					className='text-2xl border-4 border-white rounded-xl px-8 py-4 btn hover:custom-hover'
					onClick={() => navigate("/login")}
				>
					<b>Get started</b>
				</button>
			</div>
			<h1 className='text-rose-800'>{user.username}</h1>
			<h1>{user.email}</h1>
		</div>
	);
}
