import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

type DataInputLogin = {
	email: string;
	password: string;
};

export const useLogin = () => {
	const { setUser } = useUserContext();
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const login = async (dataInput: DataInputLogin) => {
		const response = await fetch("http://localhost:8000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataInput),
		});

		if (response.ok) {
			const authenticatedUser = await response.json();
			console.log(authenticatedUser);

			// add the user to the global context
			setUser((user) => {
				return {
					...user,
					username: authenticatedUser.username,
					email: authenticatedUser.email,
					token: authenticatedUser.token,
				};
			});

			// store it in the local storage
			localStorage.setItem("user", JSON.stringify(authenticatedUser));
			navigate("/");
		} else {
			const err = await response.json();
			setError(err);
		}
	};

	return { login, error };
};
