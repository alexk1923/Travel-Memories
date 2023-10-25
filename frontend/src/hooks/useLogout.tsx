import { UserType, useUserContext } from "../contexts/UserContext";

export const useLogout = () => {
	const { setUser } = useUserContext();

	const logout = () => {
		setUser({} as UserType);
		localStorage.removeItem("user");
	};
	return logout;
};
