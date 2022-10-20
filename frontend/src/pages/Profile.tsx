import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext, UserType } from "../contexts/UserContext";
import { useLogout } from "../hooks/useLogout";
import Places from "./Places";

export default function Profile() {
	const logout = useLogout();
	const [profileUser, setProfileUser] = useState({} as UserType);
	const { username } = useParams();
	const { user } = useUserContext();

	useEffect(() => {
		console.log("useEffectProfile");

		fetch(`http://localhost:8000/api/user/${username}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${user.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Data given by the API:");
				console.log(data);
				setProfileUser(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='text-white flex justify-center items-start bg-gradient-to-b lg:from-sky-700 lg:transparent h-screen'>
			<div>
				<h1>{profileUser.username}</h1>
				<h2>{profileUser.email}</h2>
			</div>
			<button onClick={logout} className='bg-rose-500'>
				Log out
			</button>
			<Places user={profileUser} />
		</div>
	);
}
