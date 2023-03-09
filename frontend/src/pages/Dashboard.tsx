import { useUserContext } from "../contexts/UserContext";
import defaultUserImg from "../img/defaultUser.svg";
import Header from "../components/Header";
import { v4 as uuid } from "uuid";
import Place from "../components/Place";

export default function Dashboard() {
	const { user, setUser } = useUserContext();

	return (
		<>
			<Header />
			<div className='bg-white flex flex-row border-b-4 border-b-slate-200'>
				<div className='flex flex-row items-center'>
					<img
						src={defaultUserImg}
						className='w-[15%] drop-shadow-xl rounded-full'
					/>
					<div>
						<h1>
							<b>{user.username}</b>
						</h1>
						<h2>{user.email}</h2>
					</div>
				</div>
			</div>
			<div className='bg-white h-screen'>
				<form className='flex flex-col w-[50%]'>
					<button>Add new place</button>
					<input></input>
					<input></input>
					<textarea></textarea>
				</form>
				{user.places != undefined &&
					user.places.map((place) => <Place {...place} key={uuid()} />)}
			</div>
		</>
	);
}
