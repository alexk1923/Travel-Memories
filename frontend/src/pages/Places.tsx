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

	const deleteFromList = (deleted_id: string) =>
		setPlaces((prevPlace) => {
			const newPlaces = prevPlace.filter((place) => place._id != deleted_id);
			return newPlaces;
		});

	useEffect(() => {
		if (user.username === undefined) {
			return;
		}

		fetch(`http://localhost:8000/api/user/${user.username}/places`, {
			method: "GET",
			headers: { Authorization: `Bearer ${user.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Data given by the API places:");
				console.log(data);
				setPlaces(data);
			})
			.catch((err) => {
				console.log("Eroare bai");
				console.log(err);
			});
	}, [user]);

	return (
		<div className='text-black grid grid-cols-3 items-center gap-2 rounded-xlg'>
			{places.map((place) => {
				return (
					<Place
						placeInfo={place}
						deleteFromList={deleteFromList}
						key={uuid()}
					/>
				);
			})}
		</div>
	);
}
