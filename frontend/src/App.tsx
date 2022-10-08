import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Places from "./pages/Places";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Header from "./pages/Header";
import Container from "./components/Container";
import Body from "./components/Body";

function App() {
	return (
		<Body>
			<Header />
			<Container>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/places' element={<Places />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</Container>
		</Body>
	);
}

export default App;
