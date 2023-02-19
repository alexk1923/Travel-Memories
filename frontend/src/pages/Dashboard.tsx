import { useUserContext } from "../contexts/UserContext";

export default function Dashboard() {
	const { user, setUser } = useUserContext();

	return (
		<>
			<img src={user.profilePhoto} />
			<div className='text-white'>{user.username}</div>
		</>
	);
}
