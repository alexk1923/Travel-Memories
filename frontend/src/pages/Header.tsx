import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Header() {
	return (
		<>
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
		</>
	);
}
