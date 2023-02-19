import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import FormInput from "../components/FormInput";
import LoginCard from "../components/LoginCard";
import useRegister from "../hooks/useRegister";
import whiteLogo from "../img/logo/default-monochrome-white.svg";

type InputValuesRegister = {
	usernameInput: string;
	emailInput: string;
	passwordInput: string;
	confirmPasswordInput: string;
	[key: string]: string;
};

export default function Register() {
	const { register, error } = useRegister();
	const [inputValues, setInputValues] = useState<InputValuesRegister>({
		usernameInput: "",
		emailInput: "",
		passwordInput: "",
		confirmPasswordInput: "",
	});

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const dataInput = {
			username: inputValues.usernameInput,
			email: inputValues.emailInput,
			password: inputValues.passwordInput,
		};

		await register(dataInput);
		if (error) {
			// reset form fields
			setInputValues(() => {
				return {
					usernameInput: "",
					emailInput: "",
					passwordInput: "",
					confirmPasswordInput: "",
				};
			});
		}
	}

	const inputs = [
		{
			key: 1,
			label: "Email",
			htmlFor: "email",
			type: "email",
			name: "emailInput",
			id: "email",
			autoComplete: "email",
			placeholder: "example@gmail.com",
			errorMessage: "Input should be a valid email address",
		},

		{
			key: 2,
			label: "Username",
			htmlFor: "username",
			type: "text",
			name: "usernameInput",
			id: "username",
			placeholder: "Username",
			errorMessage:
				"Username must have at least 5 characters, no spaces, no special characters",
			minLength: 5,
			pattern: "^[a-zA-Z0-9]+$",
		},

		{
			key: 3,
			label: "Password",
			htmlFor: "passwordRegister",
			type: "password",
			name: "passwordInput",
			id: "passwordRegister",
			placeholder: "Password",
			errorMessage: "Password should be at least 8 characters",
			minLength: 8,
		},

		{
			key: 4,
			label: "Confirm password",
			htmlFor: "cnfpassword",
			type: "password",
			name: "cnfPasswordInput",
			id: "cnfpassword",
			placeholder: "Confirm Password",
			errorMessage: "Passwords don't match",
			pattern: inputValues.passwordInput,
			minLength: 8,
		},
	];

	return (
		<>
			<div
				className="w-full h-screen bg-[url('img/mountain.jpg')] bg-[center_top_60vh] bg-cover flex flex-col 
			justify-between items-center lg:justify-center lg:bg-center lg:bg-gradient-to-b lg:from-sky-700 lg:transparent
			"
			>
				<div className='text-xl w-full flex justify-center'>
					<Link
						to='/'
						className='mt-5 w-[50%] sm:w-[55%] md:w-[40%] lg:w-[25%]'
					>
						<img src={whiteLogo} alt='logo' className='custom-drop-shadow' />
					</Link>
				</div>

				<div
					className='w-full h-[75%] sm:h-[80%] md:h-[65%] lg:h-auto bg-gradient-to-b from-slate-50 to-slate-300 rounded-t-lg mt-5 text-slate-600
				 rounded-xl flex flex-col justify-center items-center drop-shadow-md [&>*]:flex-1
				lg:flex-row 
				lg:w-[80%]
				lg:aspect-square
				lg:rounded-lg'
				>
					<form
						action='/login'
						className='w-[90%] text-sky-800 flex flex-col items-center justify-center'
						onSubmit={handleRegister}
					>
						<h1 className='text-3xl sm:text-5xl md:text-4xl'>Welcome back!</h1>
						<h2 className='text-xl sm:text-3xl'>Sign in to continue</h2>
						{error !== "" && (
							<h3 className='text-md text-red-500 bg-red-300 border-2 border-red-500 rounded-lg p-2'>
								{error}
							</h3>
						)}
						<div className='text-slate-400 flex flex-col gap-4 items-center justify-center w-full'>
							{inputs.map((input) => (
								<FormInput
									{...input}
									value={inputValues[input.name]}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setInputValues(() => {
											return {
												...inputValues,
												[e.target.name]: e.target.value,
											};
										})
									}
									error={error}
								/>
							))}
						</div>

						<button className='bg-sky-500 hover:bg-sky-600 w-[50%] md:w-[40%] lg:w-[25%] font-bold text-white rounded-lg m-2'>
							Register
						</button>

						<p className='text-slate-600'>
							Already a traveler?{" "}
							<NavLink to='/login' className='text-sky-800 hover:text-sky-500'>
								Sign In
							</NavLink>
						</p>
					</form>
					<LoginCard />
				</div>
			</div>
		</>
	);
}
