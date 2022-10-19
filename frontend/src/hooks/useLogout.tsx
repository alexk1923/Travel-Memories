import { UserType, useUserContext } from "../contexts/UserContext";

export const useLogout = () => {
	const { user, setUser } = useUserContext();

	const logout = () => {
		setUser({} as UserType);
		localStorage.removeItem("user");
	};
	return logout;
};
