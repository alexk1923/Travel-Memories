import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { useUserContext } from "../contexts/UserContext";
import { PlaceType } from "../components/Place";
import Place from "../components/Place";

export default function Places() {
	const { user } = useUserContext();
	const [places, setPlaces] = useState<PlaceType[]>([]);

	useEffect(() => {
		console.log("-----------------USEEFFECT-----------------");
		console.log(user);
		console.log("----------------------------------");

		if (user.username === undefined) {
			return;
		}

		fetch(`http://localhost:8000/api/users/${user.username}/places`)
			.then((res) => res.json())
			.then((data) => {
				console.log("Data given by the API:");
				console.log(data);
				setPlaces(data);
			})
			.catch((err) => {
				console.log("Eroare bai");
				console.log(err);
			});
	}, [user]);

	return (
		<div className='text-white'>
			{user.username}
			{places.map((place) => (
				<Place {...place} key={uuid()} />
			))}
		</div>
	);
}
