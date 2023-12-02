import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

type DataInputLogin = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState({ err: "" });
  const login = async (dataInput: DataInputLogin) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInput),
      });

      console.log("Response is:");
      console.log(response);

      if (response.ok) {
        const authenticatedUser = await response.json();

        console.log("Authenticated user:");
        console.log(authenticatedUser);

        // add the user to the global context
        setUser((user) => ({
          ...user,
          username: authenticatedUser.username,
          email: authenticatedUser.email,
          token: authenticatedUser.token,
          profilePhoto: authenticatedUser.profilePhoto,
        }));

        // store it in the local storage
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
        navigate("/");
      } else {
        const err = await response.json();
        console.log("eroarea mea din hook-ul de login este asa:");
        console.log(error);
        setError(err);
      }
    } catch (err) {
      console.log("Catched err:");
      console.log(err);
    } finally {
      console.log("ok"); // Set loading to false regardless of success or error
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
