import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { PlaceType } from "../components/Place";
import Place from "../components/Place";
import { UserType } from "../contexts/UserContext";

type PlacesPropsType = {
	user: UserType;
};

export default function Places({ user }: PlacesPropsType) {
	const [places, setPlaces] = useState<PlaceType[]>([]);

	useEffect(() => {
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
