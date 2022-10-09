import React, { useRef, useState } from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import travelImg from "../img/travel1.jpg";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import darkLogo from "../img/logo/default-monochrome-black.svg";
import openEye from "../img/open-eye.svg";
import closedEye from "../img/closed-eye.svg";

// bg-[url('img/travel1.jpg')] bg-cover bg-center brightness-10

export default function Login() {
	const [isPassword, setIsPassword] = useState(true);
	const [error, setError] = useState("");
	const emailInputElem = useRef<HTMLInputElement>(null);
	const passwordInputElem = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	function displayPassword() {
		setIsPassword((isPassword) => !isPassword);
	}

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(emailInputElem.current?.value);
		console.log(passwordInputElem.current?.value);

		const data = {
			email: emailInputElem.current?.value,
			password: passwordInputElem.current?.value,
		};

		const response = await fetch("http://localhost:8000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			navigate("/");
		} else {
			const err = await response.json();
			setError(err);
		}
	}

	return (
		<div
			className='text-xl w-full h-full flex flex-col items-center bg-gradient-to-b from-sky-300 to-sky-700
		'
		>
			<Link to='/' className='mt-5 w-[50%] sm:w-[65%] md:w-[40%] lg:w-[25%]'>
				<img src={whiteLogo} alt='logo' />
			</Link>
			<div
				className='mt-5 min-w-fit min-h-[75%] text-slate-600
				dark:text-white rounded-2xl 
			 flex flex-col lg:aspect-square lg:flex-row justify-center lg:min-h-[20%] items-center w-4/5 md:w-1/10 drop-shadow-md [&>*]:flex-1
			 backdrop-blur-[5px]'
			>
				<form
					action='/login'
					method='get'
					className='text-sky-900 flex flex-col items-center justify-center [&>*]:p-4 '
					onSubmit={handleLogin}
				>
					<h1 className='text-4xl sm:text-5xl'>Welcome back!</h1>
					<h2 className='text-xl sm:text-3xl'>Please enter your credentials</h2>
					{error && (
						<h3 className='text-md text-red-500 bg-red-300 border-2 border-red-500 rounded-lg'>
							{error}
						</h3>
					)}
					<div className='text-sky-700 flex flex-col gap-4 items-center justify-center w-full'>
						<div className='flex flex-col justify-center w-full lg:w-[40%] px-2 border rounded-xl bg-sky-300'>
							<label htmlFor='mailInput'>Email</label>
							<input
								ref={emailInputElem}
								type='email'
								required
								placeholder='john@example.com'
								autoComplete='email'
								name='mailInput'
								id='mailInput'
								className='text-slate-800 placeholder:text-slate-500 bg-transparent
								border-b-2 border-sky-700 w-full mb-3 py-2'
							></input>
						</div>
						<div className='flex flex-col justify-center w-full lg:w-[40%] px-2 border rounded-xl bg-sky-300'>
							<label htmlFor='passwordInput' className='relative'>
								Password
								<img
									src={isPassword ? openEye : closedEye}
									className='w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2'
									alt='display password as plain text'
									onClick={displayPassword}
								/>
							</label>

							<input
								ref={passwordInputElem}
								type={isPassword ? "password" : "text"}
								required
								placeholder='******'
								autoComplete='current-password'
								name='passwordInput'
								id='passwordInput'
								className='text-slate-800 placeholder:text-slate-500 bg-transparent
								border-b-2 border-sky-700 mb-3 py-2'
							></input>
						</div>
					</div>

					<button className='bg-sky-500 hover:bg-sky-600 w-1/2 lg:w-1/4 font-bold text-white rounded-lg m-2'>
						Login
					</button>

					<p className='text-white'>
						Don't have an account?{" "}
						<NavLink
							to='/register'
							className='text-slate-50 hover:text-slate-300'
						>
							Register
						</NavLink>
					</p>
				</form>
				<div className="hidden w-full h-full relative lg:bg-[url('img/travel1.jpg')] lg:bg-cover lg:bg-center">
					{/* <img src={travelImg} alt='' className='w-full object-cover'></img> */}
					<h1 className='hidden text-center text-white md:text-md lg:text-3xl font-bold'>
						Join the community to add new travel places all around the world
					</h1>
				</div>
			</div>
		</div>
	);
}
