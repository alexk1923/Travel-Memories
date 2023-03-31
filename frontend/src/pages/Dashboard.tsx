import { useUserContext } from "../contexts/UserContext";
import defaultUserImg from "../img/defaultUser.svg";
import Header from "../components/Header";
import { v4 as uuid } from "uuid";
import Place from "../components/Place";
import React, { useEffect, useReducer, useState } from "react";
import { PlaceType } from "../components/Place";
import Places from "./Places";
import { type } from "os";

type inputValuesAddPlace = {
	placeName: string;
	city: string;
	imgURL: string;
	[key: string]: string;
};

type CountryType = {
	iso3: string;
	country: string;
	cities: string[];
};

enum PlaceActionType {
	ADD = "ADD",
	DELETE = "DELETE",
	GET = "GET",
}

interface ActionInfo<T> {
	type: PlaceActionType;
	payload: T;
}

interface PlaceState {
	places: PlaceType[];
}

function reducer(
	state: PlaceState,
	action: ActionInfo<PlaceType[] | PlaceType | string>
): PlaceState {
	switch (action.type) {
		case PlaceActionType.GET:
			const newPlaces = {
				places: action.payload as PlaceType[],
			};
			return newPlaces;
		case PlaceActionType.ADD:
			state.places.push(action.payload as PlaceType);
			return state;
		case PlaceActionType.DELETE:
			return {
				places: state.places.filter(
					(place) => place._id != (action.payload as string)
				),
			};
		default:
			return { ...state };
	}
}

export default function Dashboard() {
	const { user } = useUserContext();
	const [inputValues, setInputValues] = useState<inputValuesAddPlace>({
		placeName: "",
		city: "",
		imgURL: "",
	});
	// const [places, setPlaces] = useState<PlaceType[]>([]);

	const [state, dispatch] = useReducer(reducer, { places: [] });

	const [countries, setCountries] = useState<CountryType[]>([]);
	const [currentCountry, setCurrentCountry] = useState("");
	const [cities, setCities] = useState([]);
	const [currentCity, setCurrentCity] = useState("");

	function getUserPlaces() {
		fetch(`http://localhost:8000/api/user/${user.username}/places`, {
			method: "GET",
			headers: { Authorization: `Bearer ${user.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Data given by the MAIN API places:");
				console.log(data);
				dispatch(data);
				user.places = data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getUserPlaces();
	}, [user]);

	useEffect(() => {
		fetch("https://countriesnow.space/api/v0.1/countries", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => setCountries(data.data))
			.catch((err) => console.log(err));
	}, []);

	function handleAddPlace(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const dataInput = {
			name: inputValues.placeName,
			city: `${currentCity}, ${currentCountry}`,
			imageURL: inputValues.imgURL,
		};

		console.log(dataInput);

		fetch(`http://localhost:8000/api/places`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${user.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataInput),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(`Added ${data} to the database`);
				getUserPlaces();
			})
			.catch((err) => {
				console.log(err);
			});
		setInputValues({
			placeName: "",
			city: "",
			imgURL: "",
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
			name: "imgURL",
			placeholder: "Add image url here",
		},
	];

	function fetchCities(country: string) {
		const countryData = {
			country,
		};

		console.log(countryData);

		fetch("https://countriesnow.space/api/v0.1/countries/states", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(countryData),
		})
			.then((res) => res.json())
			.then((data) => setCities(data.data.states));
	}

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
								<input
									value={inputValues[inputElem.name]}
									{...inputElem}
									onChange={(e) =>
										setInputValues({
											...inputValues,
											[inputElem.name]: e.target.value,
										})
									}
								></input>
							</React.Fragment>
						);
					})}
					{currentCountry}
					<select
						onChange={(e) => {
							setCurrentCountry(e.target.value);
							console.log("S-a schimbat tara");
							fetchCities(e.target.value);
						}}
						value={currentCountry}
					>
						<option value='' disabled hidden>
							Choose a country
						</option>
						{countries.map((country) => (
							<React.Fragment key={uuid()}>
								<option value={country.country}>{country.country}</option>
							</React.Fragment>
						))}
					</select>
					<select
						onChange={(e) => setCurrentCity(e.target.value)}
						value={currentCity}
					>
						<option value='' disabled hidden>
							Choose a country, then a city
						</option>
						{cities.map((city: { name: string }) => (
							<React.Fragment key={uuid()}>
								<option value={city.name}>{city.name}</option>
							</React.Fragment>
						))}
					</select>
					<button className='btn w-[15%]'>Add new place</button>
				</form>

				<Places user={user}></Places>
			</div>
		</>
	);
}
