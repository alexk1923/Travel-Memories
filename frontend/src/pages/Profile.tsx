import { useUserContext, UserType } from "../contexts/UserContext";
import { useLogout } from "../hooks/useLogout";

export default function Profile() {
	const { user, setUser } = useUserContext();
	const logout = useLogout();

	return (
		<div className='text-white flex justify-between'>
			My profile
			<h1>{user.username}</h1>
			<h2>{user.email}</h2>
			<button onClick={logout} className='bg-rose-500'>
				Log out
			</button>
		</div>
	);
}
