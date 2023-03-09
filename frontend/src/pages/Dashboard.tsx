import { useUserContext } from "../contexts/UserContext";
import defaultUserImg from "../img/defaultUser.svg";
import Header from "../components/Header";
import { v4 as uuid } from "uuid";
import Place from "../components/Place";
import React, { useState } from "react";

export default function Dashboard() {
	const { user, setUser } = useUserContext();
	const [inputValues, setInputValues] = useState({
		placeName: "",
		city: "",
		imgURL: "",
	});

	function handleAddPlace(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const dataInput = {
			name: inputValues.placeName,
			city: inputValues.city,
			imageURL: inputValues.imgURL,
		};

		fetch(`http://localhost:8000/api/places`, {
			method: "POST",
			headers: { Authorization: `Bearer ${user.token}` },
			body: JSON.stringify(dataInput),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => {
				console.log(err);
			});
	}

	const inputs = [
		{
			key: 1,
			name: "placeName",
			placeholder: "What is the last place you have visited?",
		},
		{
			key: 2,
			name: "city",
			placeholder: "Country, city",
		},
		{
			key: 3,
			name: "imgURL",
			placeholder: "Add image url here",
		},
	];

	return (
		<>
			<Header />
			<div className='bg-white flex flex-row border-b-4 border-b-slate-200'>
				<div className='flex flex-row items-center'>
					<img
						src={defaultUserImg}
						className='w-[15%] drop-shadow-xl rounded-full'
					/>
					<div>
						<h1>
							<b>{user.username}</b>
						</h1>
						<h2>{user.email}</h2>
					</div>
				</div>
			</div>
			<div className='bg-white h-screen'>
				<form
					className='flex flex-col items-center w-full gap-2 [&>*]:w-[30%]
				[&>*]:border-2 [&>*]:border-black'
					onSubmit={handleAddPlace}
				>
					{inputs.map((inputElem) => {
						return (
							<React.Fragment key={inputElem.key}>
								<input {...inputElem}></input>
							</React.Fragment>
						);
					})}
					<textarea placeholder='Place description'></textarea>
					<button className='btn w-[15%]'>Add new place</button>
				</form>
				{user.places != undefined &&
					user.places.map((place) => <Place {...place} key={uuid()} />)}
			</div>
		</>
	);
}
