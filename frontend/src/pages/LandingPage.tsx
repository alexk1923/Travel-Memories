import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Header from "../components/Header";
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
			<Header />
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
					<img src={mapMarker} className='w-[50%]' alt='map marker' />
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
