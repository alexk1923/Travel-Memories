import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import FormInput from "../components/FormInput";
import LoginCard from "../components/LoginCard";
import useRegister from "../hooks/useRegister";
import whiteLogo from "../img/logo/default-monochrome-white.svg";

type InputValuesRegister = {
  usernameInput: string;
  emailInput: string;
  passwordInput: string;
  confirmPasswordInput: string;
  [key: string]: string;
};

export default function Register() {
  const { register, error } = useRegister();
  const [inputValues, setInputValues] = useState<InputValuesRegister>({
    usernameInput: "",
    emailInput: "",
    passwordInput: "",
    confirmPasswordInput: "",
  });

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dataInput = {
      username: inputValues.usernameInput,
      email: inputValues.emailInput,
      password: inputValues.passwordInput,
    };

    await register(dataInput);
    if (error) {
      // reset form fields
      setInputValues(() => {
        return {
          usernameInput: "",
          emailInput: "",
          passwordInput: "",
          confirmPasswordInput: "",
        };
      });
    }
  }

  const inputs = [
    {
      key: 1,
      label: "Email",
      htmlFor: "email",
      type: "email",
      name: "emailInput",
      id: "email",
      autoComplete: "email",
      placeholder: "example@gmail.com",
      errorMessage: "Input should be a valid email address",
    },

    {
      key: 2,
      label: "Username",
      htmlFor: "username",
      type: "text",
      name: "usernameInput",
      id: "username",
      placeholder: "Username",
      errorMessage:
        "Username must have at least 5 characters, no spaces, no special characters",
      minLength: 5,
      pattern: "^[a-zA-Z0-9]+$",
    },

    {
      key: 3,
      label: "Password",
      htmlFor: "passwordRegister",
      type: "password",
      name: "passwordInput",
      id: "passwordRegister",
      placeholder: "Password",
      errorMessage: "Password should be at least 8 characters",
      minLength: 8,
    },

    {
      key: 4,
      label: "Confirm password",
      htmlFor: "cnfpassword",
      type: "password",
      name: "cnfPasswordInput",
      id: "cnfpassword",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      pattern: inputValues.passwordInput,
      minLength: 8,
    },
  ];

  return (
    <>
      <div
        className="lg:transparent flex h-screen w-full flex-col items-center justify-between 
			bg-[url('img/mountain.jpg')] bg-cover bg-[center_top_60vh] lg:justify-center lg:bg-gradient-to-b lg:from-sky-700 lg:bg-center
			"
      >
        <div className="flex w-full justify-center text-xl">
          <Link
            to="/"
            className="mt-5 w-[50%] sm:w-[55%] md:w-[40%] lg:w-[25%]"
          >
            <img src={whiteLogo} alt="logo" className="custom-drop-shadow" />
          </Link>
        </div>

        <div
          className="mt-5 flex h-[75%] w-full flex-col items-center justify-center rounded-xl rounded-t-lg bg-gradient-to-b from-slate-50
				 to-slate-300 text-slate-600 drop-shadow-md sm:h-[80%] md:h-[65%] lg:aspect-square lg:h-auto
				lg:w-[80%] 
				lg:flex-row
				lg:rounded-lg
				[&>*]:flex-1"
        >
          <form
            action="/login"
            className="flex w-[90%] flex-col items-center justify-center text-sky-800"
            onSubmit={handleRegister}
          >
            <h1 className="text-3xl sm:text-5xl md:text-4xl">Welcome back!</h1>
            <h2 className="text-xl sm:text-3xl">Sign in to continue</h2>
            {error !== "" && (
              <h3 className="text-md text-red-500 bg-red-300 border-red-500 rounded-lg border-2 p-2">
                {error}
              </h3>
            )}
            <div className="flex w-full flex-col items-center justify-center gap-4 text-slate-400">
              {inputs.map((input) => (
                <FormInput
                  {...input}
                  value={inputValues[input.name]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValues({
                      ...inputValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  errorMessage={error}
                />
              ))}
            </div>

            <button className="m-2 w-[50%] rounded-lg bg-sky-500 font-bold text-white hover:bg-sky-600 md:w-[40%] lg:w-[25%]">
              Register
            </button>

            <p className="text-slate-600">
              Already a traveler?{" "}
              <NavLink to="/login" className="text-sky-800 hover:text-sky-500">
                Sign In
              </NavLink>
            </p>
          </form>
          <LoginCard />
        </div>
      </div>
    </>
  );
}
