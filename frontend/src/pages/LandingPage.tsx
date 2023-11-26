import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import AOS from "aos";
import "aos/dist/aos.css";
import about1 from "../img/about1.png"
import about2 from "../img/about2.png"

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Place, { PlaceType } from "../components/Place";
import { usePlaceContext } from "../contexts/PlaceContext";
import Divider from "../components/Divider";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function LandingPage() {
	const { user } = useUserContext();
	const { state } = usePlaceContext();
	const [demoPlaces, setDemoPlaces] = useState<PlaceType[]>([] as PlaceType[]);
	const navigate = useNavigate();
	const trendingRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		AOS.init();
	}, []);

	const handleExplore = () => {
		if (trendingRef.current) {
			trendingRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}

	useEffect(() => {
		fetch(`http://localhost:8000/api/places/all?limit=5`, {
			method: "GET"
		}).then(res => {
			console.log(res);
			return res.json()
		}).then(data => {
			console.log("Am primit cu o limita de 5 urmatoarele locuri:");
			console.log(data);
			setDemoPlaces(data);
		})
	}, [])

	return (
		<div className="h-screen w-full">

			<div
				className="text-white flex flex-col justify-stretch h-screen w-full
		bg-[url('./img/landing-bg.png')] bg-center bg-cover"
			>
				<Navbar />

				<div className="flex flex-col justify-center items-center md:max-w-[50%] mx-auto my-auto text-center gap-4">
					<h1 className="font-bold drop-shadow-lg">MOST EXCITING PLACES TO VISIT</h1>
					<h3 className="drop-shadow-lg font-semibold">Get new travel ideas and connect  with people
						all over the world to take a look
						at their journey</h3>
					<Button text="EXPLORE" variant="filled" onClick={handleExplore} />
				</div>

			</div>

			{/* Used only for scrolling */}
			<div ref={trendingRef}></div>

			<Divider />

			<div className="flex flex-col justify-center items-center text-center gap-4">
				<h2 className="font-bold drop-shadow-lg">TRENDING PLACES</h2>
				<h3 className=" drop-shadow-lg font-semibold">Find the perfect place for your next travel</h3>
				<div className="flex justify-center flex-wrap md:flex-nowrap gap-5 text-black overflow-hidden max-w-full">
					{demoPlaces.map(place => <Place {...place} />)}
				</div>
				<Button text={"DISCOVER MORE"} variant={"filled"} onClick={undefined} />
			</div>

			<Divider />


			<div className="flex flex-col justify-center items-center text-center gap-4 lg:mx-[20%]">
				<h2 className="font-bold drop-shadow-lg">Different people, same passion</h2>
				<div className="flex items-start justify-between" >
					<img src={about1} className="max-w-[50%]" />
					<div className="text-start ps-8">
						<h3 className="font-bold text-primary ">A network meant to connect</h3>
						<p className="text-body-1">To gether, we'll explore new horizons, learn from one another, and build bridges that connect us across the continents.
							Because no matter where you're from, the desire to explore and connect with the world is a universal language we all share.</p>
					</div>
				</div>

				<div className="flex items-start justify-between" >
					<div className="text-start pe-8 flex-1 ps-2 lg:ps-0">
						<h3 className="font-bold text-primary ">Track your journey</h3>
						<p className="text-body-1">Our platform is designed to offer an intuitive and organized way for you to easily track the places you've visited.
							Create a plan for your future adventures by exploring and saving desired experiences within your personal profile to access them whenever you need. </p>
					</div>
					<div className="flex-1">
						<img src={about2} className="h-full object-cover" />
					</div>
				</div>

				<span className="text-body-1 font-semibold italic text-primary">Learn more {">"}  </span>
			</div>


			<Divider />


			<div className="bg-waves-bg bg-cover bg-center flex flex-col lg:flex-row items-center lg:px-[20%] lg:h-screen">

				<div className="ms-8">
					<h3 className="text-primary font-bold mt-4 lg:mt-0">GET IN TOUCH</h3>
					<p className="text-body-1">Still have questions? Send us a message and our response will come as quickly as possible</p>
				</div>
				<ContactForm />

			</div>

			<Footer />
		</div>




	);
}
