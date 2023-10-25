import { useState } from "react";
import { useLogin } from "./useLogin";

type DataInputRegister = {
	username: string;
	email: string;
	password: string;
};

export default function useRegister() {
	const [error, setError] = useState("");
	const { login } = useLogin();

	const register = async (dataInput: DataInputRegister) => {
		const response = await fetch("http://localhost:8000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataInput),
		});

		if (response.ok) {
			const authenticatedUser = await response.json();
			console.log(authenticatedUser);
			login({ email: dataInput.email, password: dataInput.password });
		} else {
			const err = await response.json();
			setError(err);
		}
	};

	return { register, error };
}
