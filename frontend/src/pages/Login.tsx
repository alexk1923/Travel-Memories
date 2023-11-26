import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import FormInput from "../components/FormInput";
import LoginCard from "../components/LoginCard";
import { useLogin } from "../hooks/useLogin";

// bg-[url('img/travel1.jpg')] bg-cover bg-center brightness-10

export type InputValuesType = {
	emailInput: string;
	passwordInput: string;
	[key: string]: string;
};

export default function Login() {
	const [inputValues, setInputValues] = useState<InputValuesType>({
		emailInput: "",
		passwordInput: "",
	});

	const { login, error } = useLogin();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const dataInput = {
			email: inputValues.emailInput,
			password: inputValues.passwordInput,
		};

		await login(dataInput);
		if (error) {
			// reset form fields
			setInputValues(() => {
				return {
					...inputValues,
					passwordInput: "",
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
			autoComplete: "email",
			placeholder: "example@gmail.com",
			errorMessage: "Input should be a valid email address",
		},

		{
			key: 2,
			label: "Password",
			htmlFor: "password",
			type: "password",
			name: "passwordInput",
			autoComplete: "password",
			placeholder: "",
			errorMessage: "Password should be at least 8 characters",
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
					className='w-full h-[75%] sm:h-[80%] md:h-[65%] lg:h-[70%] bg-gradient-to-b from-slate-50 to-slate-300 rounded-t-lg  mt-5 text-slate-600
				 rounded-xl flex flex-col justify-center items-center drop-shadow-md [&>*]:flex-1
				lg:flex-row 
				lg:w-[80%]
				lg:aspect-square
				lg:rounded-lg'
				>
					<form
						action='/login'
						className='w-[90%] text-sky-800 flex flex-col items-center justify-center gap-4 '
						onSubmit={handleLogin}
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
									errorMessage={error}
								/>
							))}
						</div>

						<button className='bg-sky-500 hover:bg-sky-600 w-[50%] md:w-[40%] lg:w-[25%] font-bold text-white rounded-lg m-2'>
							Login
						</button>

						<p className='text-slate-600'>
							Don't have an account?{" "}
							<NavLink
								to='/register'
								className='text-sky-800 hover:text-sky-500'
							>
								Register
							</NavLink>
						</p>
					</form>
					<LoginCard />
				</div>
			</div>
		</>
	);
}
