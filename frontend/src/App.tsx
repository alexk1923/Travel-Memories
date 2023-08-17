import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserProvider, { useUserContext } from "./contexts/UserContext";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import Feed from "./pages/Feed";
import { useLogout } from "./hooks/useLogout";
import { PlaceProvider } from "./contexts/PlaceContext";

function App() {
	const { user, setUser } = useUserContext();
	const logout = useLogout();

	useEffect(() => {
		const storageUser = localStorage.getItem("user");

		if (user.username == undefined && storageUser) {
			setUser(JSON.parse(storageUser));
			console.log("S-a setat userul global si se va face un API request");
		}

		if (user.username != undefined) {
			console.log("My user is: ");
			console.log(user);
			// Check if the token is still valid
			fetch(`http://localhost:8000/api/user/${user.username}`, {
				method: "GET",
				headers: { Authorization: `Bearer ${user.token}` },
			}).then((res) => {
				if (res.status == 401) {
					logout();
				} else if (user.username != undefined) {
					console.log("My user second requesst is: ");
					console.log(user);
				}
			});
		}
	}, [user]);

	return (
		<div className='h-screen bg-black'>
			<Routes>
				<Route
					path='/'
					element={
						user.username === undefined ? (
							<LandingPage />
						) : (
							<Feed />
						)
					}
				/>

				<Route path='/login' element={<Login />} />
				<Route path='/user/:profileUser' element={<PlaceProvider><Profile /></PlaceProvider>} />
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>

	);
}

export default App;
