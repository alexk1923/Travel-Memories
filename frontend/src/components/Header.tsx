import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import whiteLogo from "../img/logo/default-monochrome-white.svg";

export default function Header() {
	return (
		<>
			<Link to='/'>
				<img src={whiteLogo} alt='logo' className='w-[50%]' />
			</Link>
			<nav className='bg-transparent text-white flex justify-center items-center w-full'>
				<ul className='flex flex-row gap-3 [&>*]:p-4 [&>*]:font-bold'>
					<li>
						<NavLink to='/'>HOME</NavLink>
					</li>
					<li>
						<NavLink to='/login'>LOGIN</NavLink>
					</li>
					<li>
						<NavLink to='/register'>REGISTER</NavLink>
					</li>
				</ul>
			</nav>
			<SearchBar />
			<Outlet />
		</>
	);
}
