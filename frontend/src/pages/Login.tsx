import React, { useRef, useState } from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import travelImg from "../img/travel1.jpg";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import darkLogo from "../img/logo/default-monochrome-black.svg";
import openEye from "../img/open-eye.svg";
import closedEye from "../img/closed-eye.svg";
import { useUserContext } from "../contexts/UserContext";
import { UserType } from "../contexts/UserContext";

// bg-[url('img/travel1.jpg')] bg-cover bg-center brightness-10

export default function Login() {
	const [isPassword, setIsPassword] = useState(true);
	const [error, setError] = useState("");
	const emailInputElem = useRef<HTMLInputElement>(null);
	const passwordInputElem = useRef<HTMLInputElement>(null);
	const { user, setUser } = useUserContext();
	const navigate = useNavigate();

	function displayPassword() {
		setIsPassword((isPassword) => !isPassword);
	}

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

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
			const data = await response.json();
			console.log(data);

			setUser((user) => {
				{
					const newUser: UserType = {
						...user,
						username: data.username,
						email: data.email,
					};
					return newUser;
				}
			});
			navigate("/");
		} else {
			const err = await response.json();
			setError(err);
		}
	}

	return (
		<>
			<div
				className="w-full h-screen bg-[url('img/mountain.jpg')] bg-[center_top_60vh] bg-cover flex flex-col 
			justify-between items-center lg:justify-center lg:bg-center lg:bg-gradient-to-b lg:from-slate-50 lg:to-slate-500"
			>
				<div className='text-xl w-full flex justify-center'>
					<Link
						to='/'
						className='mt-5 w-[50%] sm:w-[55%] md:w-[40%] lg:w-[25%]'
					>
						<img src={whiteLogo} alt='logo' />
					</Link>
				</div>

				<div
					className='w-full h-[60%] sm:h-[80%] md:h-[65%] lg:h-[70%] bg-gradient-to-b from-slate-50 to-slate-300 rounded-t-lg  mt-5 text-slate-600
				 rounded-xl flex flex-col justify-center items-center drop-shadow-md [&>*]:flex-1
				lg:flex-row 
				lg:w-[80%]
				lg:aspect-square
				lg:rounded-lg
			 '
				>
					<form
						action='/login'
						method='get'
						className='w-[90%] text-sky-800 flex flex-col items-center justify-center gap-4 '
						onSubmit={handleLogin}
					>
						<h1 className='text-4xl sm:text-5xl md:text-4xl'>Welcome back!</h1>
						<h2 className='text-xl sm:text-3xl'>Sign in to continue</h2>
						{error && (
							<h3 className='text-md text-red-500 bg-red-300 border-2 border-red-500 rounded-lg'>
								{error}
							</h3>
						)}
						<div className='text-slate-400 flex flex-col gap-4 items-center justify-center w-full'>
							<div className='flex flex-col justify-center w-full lg:w-[60%] px-2'>
								<label htmlFor='mailInput'>Email</label>
								<input
									ref={emailInputElem}
									type='email'
									required
									placeholder='john@example.com'
									autoComplete='email'
									name='mailInput'
									id='mailInput'
									className='outline-none focus-visible:outline focus-visible:outline-offset-0 focus-visible:outline-sky-300 
									text-slate-800 placeholder:text-slate-500 bg-slate-300 rounded-xl
								 w-full mb-3 p-2 '
								></input>
							</div>
							<div className='flex flex-col justify-center w-full lg:w-[60%] px-2 '>
								<label htmlFor='passwordInput' className='relative'>
									Password
									<img
										src={isPassword ? openEye : closedEye}
										className='w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2'
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
									className='outline-none focus-visible:outline focus-visible:outline-offset-0 focus-visible:outline-sky-300  text-slate-800 placeholder:text-slate-500 bg-slate-300 mb-3 rounded-xl p-2
									active:border-6 active:border-sky-300'
								></input>
							</div>
						</div>

						<button className='bg-sky-500 hover:bg-sky-600 w-1/2 lg:w-1/4 font-bold text-white rounded-lg m-2'>
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
					<div className="hidden relative h-full lg:block lg:bg-[url('img/mountain.jpg')] lg:bg-cover lg:bg-center lg:broder- lg:rounded-lg">
						{/* <img src={travelImg} alt='' className='w-full object-cover'></img> */}
						<div className='hidden lg:flex flex-col justify-center w-[80%] aspect-square text-center font-bold text-white border-2 md:text-lg backdrop-blur-sm absolute left-[10%] top-1/2 transform -translate-y-1/2'>
							<h1 className=' lg:text-3xl  xlg:text-5xl p-3 drop-shadow-xl'>
								Join the community.
							</h1>
							<h2 className='lg:text-xl text-slate-50 drop-shadow-2xl'>
								Add new travel places from all around the world
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
