import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import mapMarker from "../img/map-marker.svg";
import { FaUserAlt, FaGlobeAmericas } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage() {
	const { user } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div
			className="text-white flex flex-col justify-stretch h-screen
		lg:bg-[url('./img/landing-bg.jpg')] lg:bg-center lg:bg-cover"
		>
			<div
				className="flex-1 min-h-fit bg-[url('./img/landing-bg.jpg')] bg-center bg-cover
				flex justify-center items-start w-full lg:bg-none lg:justify-between lg:items-center lg:flex-none"
			>
				<div className='w-[25%]'>
					<button
						type='button'
						className='hidden lg:block text-xl text-sky-900 border-4 border-sky-900 px-8 py-4 m-4'
					>
						<b>
							<a href='/places'>Explore</a>
						</b>
					</button>
				</div>
				<a href='/' className='w-[50%] mt-5 lg:max-w-[25%] lg:flex-1 lg:m-0'>
					<img
						src={whiteLogo}
						alt='next travel'
						className=' custom-drop-shadow'
					/>
				</a>

				<div className='flex justify-end w-[25%] min-w-fit gap-5 mr-[2%]'>
					<button
						type='button'
						className='hidden lg:block text-xl border-2 rounded-2xl border-white px-8 py-2 '
					>
						<b>
							<a href='/login'>Login</a>
						</b>
					</button>
					<button
						type='button'
						className='hidden lg:block text-xl border-2 rounded-2xl border-white px-8 py-2'
					>
						<b>
							<a href='/register'>Register</a>
						</b>
					</button>
				</div>
			</div>

			<div className='hidden lg:flex flex-1 justify-between items-center'>
				<div
					data-aos='fade-left'
					data-aos-delay='150'
					data-aos-duration='1500'
					className='hidden lg:flex flex-1 flex-col justify-center max-w-[50%] ml-4'
				>
					<h1 className='md:text-7xl lg::text-9xl mb-4'>
						DISCOVER YOUR NEXT TRIP
					</h1>
					<p className='text-2xl'>
						Explore places from all around the world, added by community
						members. Choose your next destination and share the experience with
						others
					</p>
				</div>

				<div
					data-aos='fade-right'
					data-aos-delay='150'
					data-aos-duration='1500'
					className='hidden lg:flex text-3xl gap-5 flex-col border-l-4 border-l-white pl-5 mr-6'
				>
					<div className='[&>*]'>
						<FaUserAlt className='inline mr-6' />
						<span>300+ users</span>
					</div>
					<div>
						<FaGlobeAmericas className='inline mr-6' />
						<span>700+ locations</span>
					</div>
				</div>
			</div>

			<div className='lg:hidden flex-[2] bg-gradient-to-b from-sky-700 h-[50%] to-sky-900/0 flex flex-col items-center'>
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
