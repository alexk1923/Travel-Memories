import React from "react";
import { useUserContext } from "../contexts/UserContext";

export default function LandingPage() {
	const { user } = useUserContext();
	return (
		<div className='sadasdasdasdasdadasdas'>
			<h1>
				LANDING PAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
			</h1>
			<h1 className='text-rose-800'>{user.username}</h1>
			<h1>{user.email}</h1>
		</div>
	);
}
