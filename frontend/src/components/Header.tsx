import { Link, NavLink } from "react-router-dom";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import { useUserContext } from "../contexts/UserContext";

export default function Header() {
	const { user } = useUserContext();
	return (
		<>
			<div
				className="flex-1 min-h-fit bg-[url('./img/landing-bg.jpg')] bg-center bg-cover
				flex justify-center items-start w-full lg:bg-none lg:justify-between lg:items-center lg:flex-none"
			>
				<div className='w-[25%]'>
					<Link to='/places'>
						<button
							type='button'
							className='hidden lg:block text-xl text-sky-900 border-4 border-sky-900 px-8 py-4 m-4'
						>
							<b>Explore</b>
						</button>
					</Link>
				</div>
				<Link to='/' className='w-[50%] mt-5 lg:max-w-[25%] lg:flex-1 lg:m-0'>
					<img
						src={whiteLogo}
						alt='next travel'
						className=' custom-drop-shadow'
					/>
				</Link>
				{user.username === undefined ? (
					<div className='flex justify-end w-[25%] min-w-fit gap-5 mr-[2%]'>
						<NavLink to='/login'>
							<button
								type='button'
								className=' text-white lg:block text-xl border-2 rounded-2xl border-white px-8 py-2 '
							>
								<b>Login</b>
							</button>
						</NavLink>
						<NavLink to='/register'>
							<button
								type='button'
								className=' text-white lg:block text-xl border-2 rounded-2xl border-white px-8 py-2'
							>
								<b>Register</b>
							</button>
						</NavLink>
					</div>
				) : (
					<Link to={`/user/${user.username}`}>
						<div className='flex justify-end w-[25%] min-w-fit gap-5 mr-[2%] text-white'>
							{user.username}
						</div>
					</Link>
				)}
			</div>
		</>
	);
}
