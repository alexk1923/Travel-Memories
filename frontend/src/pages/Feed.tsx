import { useUserContext } from "../contexts/UserContext";
import defaultUserImg from "../img/defaultUser.svg";
import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import Places from "../components/Places";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";
import SocialWrapper from "./SocialWrapper";
import { PlaceType } from "../components/Place";

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

function Feed() {
	const { user } = useUserContext();
	const [inputValues, setInputValues] = useState<inputValuesAddPlace>({
		placeName: "",
		city: "",
		imgURL: "",
	});
	// const [places, setPlaces] = useState<PlaceType[]>([]);

	const [countries, setCountries] = useState<CountryType[]>([]);
	const [currentCountry, setCurrentCountry] = useState("");
	const [cities, setCities] = useState([]);
	const [currentCity, setCurrentCity] = useState("");
	const { state, dispatch } = usePlaceContext();
	const [allPlaces, setAllPlaces] = useState<PlaceType[]>([]);
	const [filteredAllPlaces, setFilteredAllPlaces] = useState<PlaceType[]>([]);

	function getUserPlaces() {
		fetch(`http://localhost:8000/api/user/${user.username}/places`, {
			method: "GET",
			headers: { Authorization: `Bearer ${user.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: PlaceActionType.GET, payload: data });
				user.places = data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// Get places
	useEffect(() => {
		getUserPlaces();
	}, [user]);

	// Get and set the countries
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

		if (currentCity.length === 0) {
			alert('SELECT A CITY FIRST!');
			return;
		}

		const dataInput = {
			name: inputValues.placeName,
			country: currentCountry,
			city: currentCity,
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
				dispatch({ type: PlaceActionType.ADD, payload: data });
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

	useEffect(() => {
		fetch(`http://localhost:8000/api/places/all`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json", },
		}).then(res => res.json())
			.then(data => setAllPlaces(data))
	}, [])

	useEffect(() => {
		console.log('Current Country or City changed');
		console.log(`${currentCountry} cu city: ${currentCity}`);
		console.log(allPlaces);

		setFilteredAllPlaces(allPlaces.filter(place => place.country === currentCountry));

		// A city is selected
		if (currentCity.length > 0) {
			setFilteredAllPlaces(allPlaces.filter(place => place.country === currentCountry && place.city === currentCity));
		}


	}, [currentCountry, currentCity])

	return (
		<>
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
					{currentCountry.length > 0 && <select
						onChange={(e) => setCurrentCity(e.target.value)}
						value={currentCity}
					>
						<option value=''>
							-
						</option>
						{cities.map((city: { name: string }) => (
							<React.Fragment key={uuid()}>
								<option value={city.name}>{city.name}</option>
							</React.Fragment>
						))}
					</select>}

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
					<button className='btn w-[15%]'>Add new place</button>
				</form>
				<div className="text-red-800">
					{filteredAllPlaces.map(filteredPlace => <p key={uuid()}>{`${filteredPlace.name} from ${filteredPlace.country}, ${filteredPlace.city}`}</p>)}
				</div>
			</div>
		</>
	);
}

const FeedPage = () => SocialWrapper({ WrappedComponent: Feed });
export default FeedPage;