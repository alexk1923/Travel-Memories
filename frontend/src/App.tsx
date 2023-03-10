import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Places from "./pages/Places";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Container from "./components/Container";
import Body from "./components/Body";
import UserProvider, { useUserContext } from "./contexts/UserContext";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { useLogout } from "./hooks/useLogout";

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
					fetch(`http://localhost:8000/api/user/${user.username}/places`, {
						method: "GET",
						headers: { Authorization: `Bearer ${user.token}` },
					})
						.then((res) => res.json())
						.then((data) => {
							console.log("Data given by the MAIN API places:");
							user.places = data;
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
		}
	}, [user]);

	return (
		<Body>
			<Container>
				<Routes>
					<Route
						path='/'
						element={
							user.username === undefined ? <LandingPage /> : <Dashboard />
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/user/:username' element={<Profile />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<NotFound />} />
				</Routes>

				<Footer />
			</Container>
		</Body>
	);
}

export default App;
