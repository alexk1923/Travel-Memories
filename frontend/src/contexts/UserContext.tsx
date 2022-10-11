import React, { createContext, useContext, useState } from "react";

type UserProps = {
	children: React.ReactNode;
};

export type UserType = {
	username: String;
	email: String;
	token: String;
	profilePhoto: String;
	places: [];
};

type ContextValue = {
	user: UserType;
	setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const UserContext = createContext<ContextValue>({} as ContextValue);

export function useUserContext() {
	return useContext(UserContext);
}

export default function UserProvider({ children }: UserProps) {
	const [user, setUser] = useState<UserType>({} as UserType);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
