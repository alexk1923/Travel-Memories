import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserProvider, { useUserContext } from "./contexts/UserContext";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import Feed from "./pages/Feed";
import { useLogout } from "./hooks/useLogout";
import { PlaceProvider, usePlaceContext } from "./contexts/PlaceContext";
import PlaceDetailsPage from "./pages/PlaceDetails";

function App() {
  const { user, setUser } = useUserContext();
  const logout = useLogout();

  useEffect(() => {
    const storageUser = localStorage.getItem("user");

    if (
      user.username === undefined &&
      storageUser !== null &&
      JSON.parse(storageUser).username !== undefined
    ) {
      setUser(JSON.parse(storageUser));
    }

    if (user.username !== undefined) {
      // Check if the token is still valid
      fetch(`http://localhost:8000/api/user/${user.username}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => {
          if (res.status === 401) {
            logout();
          }
          return res.json();
        })
        .then((dataUser) => {
          if (user.username !== undefined) {
            console.log(
              "My user after getting all his data from the database is: ",
            );
            console.log(dataUser);
          }
        });
    }
  }, [user.username, user.token]);

  return (
    <div className="h-screen bg-black">
      <Routes>
        <Route
          path="/"
          element={
            user.username === undefined ? (
              <LandingPage />
            ) : (
              <PlaceProvider>
                <Feed />
              </PlaceProvider>
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/user/:profileUser"
          element={
            <PlaceProvider>
              {" "}
              <Profile />{" "}
            </PlaceProvider>
          }
        />
        <Route
          path="/place/:placeId"
          element={
            <PlaceProvider>
              {" "}
              <PlaceDetailsPage />{" "}
            </PlaceProvider>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
