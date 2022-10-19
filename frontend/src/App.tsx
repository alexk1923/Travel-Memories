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

function App() {
	const { user, setUser } = useUserContext();

	useEffect(() => {
		const storageUser = localStorage.getItem("user");
		if (storageUser) {
			console.log("S-a incarcat userul");
			setUser(JSON.parse(storageUser));
		}
	}, []);

	return (
		<Body>
			<Container>
				<Routes>
					<Route
						path='/'
						element={
							user.username === undefined ? <LandingPage /> : <Profile />
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/places' element={<Places />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<NotFound />} />
				</Routes>

				<Footer />
			</Container>
		</Body>
	);
}

export default App;
