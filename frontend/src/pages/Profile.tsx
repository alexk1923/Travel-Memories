import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext, UserType } from "../contexts/UserContext";
import { useLogout } from "../hooks/useLogout";
import defaultUser from "../img/defaultUser.svg";
import Places from "./Places";
import SocialWrapper from "./SocialWrapper";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";

function Profile() {
	const logout = useLogout();
	const { profileUser } = useParams();
	const { user } = useUserContext();
	const { state, dispatch } = usePlaceContext();

	// function getUserPlaces() {
	// 	fetch(`http://localhost:8000/api/user/${profileUser}/places`, {
	// 		method: "GET",
	// 		headers: { Authorization: `Bearer ${user.token}` },
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			dispatch({ type: PlaceActionType.GET, payload: data });
	// 			// user.places = data;
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	// Get places
	// useEffect(() => {
	// 	getUserPlaces();
	// }, [user]);


	return (
		<div className='text-white flex flex-column justify-center items-start bg-gradient-to-b lg:from-sky-700 lg:transparent h-screen'>
			<div>
				<img src={defaultUser} className='w-10' />
				<h1>{profileUser}</h1>
				{profileUser === user.username && <h2>{user.email}</h2>}
			</div>
			<button onClick={logout} className='bg-rose-500'>
				Log out
			</button>
			<Places profileUser={profileUser} />
		</div>
	);
}

const ProfilePage = () => SocialWrapper({ WrappedComponent: Profile });

export default ProfilePage;
