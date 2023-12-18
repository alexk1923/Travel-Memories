import React, { useEffect, useState } from "react";
import navbarLogo from "../img/logo/default-monochrome.svg";
import Button from "./Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { NAVBAR_VARIANT } from "../constants";
import { useUserContext } from "../contexts/UserContext";

type NavbarProps = {
  variant: NAVBAR_VARIANT;
};

export default function Navbar(props: NavbarProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

  const { user } = useUserContext();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const { variant } = props;
  const variantToStyle = {
    [NAVBAR_VARIANT.TRANSPARENT]: "bg-black/[.1]  backdrop-blur",
    [NAVBAR_VARIANT.SOLID]: "bg-primary",
  };
  return (
    <nav className={"flex w-full text-white " + variantToStyle[variant]}>
      <div className="flex w-screen items-center justify-between gap-4 px-8 py-4 lg:mx-[20%] lg:justify-between ">
        <img
          src={navbarLogo}
          alt="logo"
          className="max-w-[50%] md:max-w-[25%] lg:max-w-[25%]"
          onClick={() => navigate("/")}
        />

        {isLargeScreen ? (
          <>
            {" "}
            <ul className="justify-content text-body-1 mx-auto flex gap-5 font-semibold">
              <li className="text-body-1 inline">
                <span className="text-body">HOME</span>
              </li>
              <li className="inline">
                <span className="text-body">EXPLORE</span>
              </li>
              <li className="inline">
                <span className="text-body">ABOUT</span>
              </li>
            </ul>
            {user.username === undefined && (
              <Button
                text="LOGIN"
                variant="outline"
                onClick={() => navigate("/login")}
              />
            )}
          </>
        ) : (
          <span
            className="text-md md:text-2xl"
            onClick={() => {
              console.log("Open menu");
              return 0;
            }}
          >
            <FaAlignJustify />
          </span>
        )}
        {user.username && (
          <div className="absolute right-10 flex items-center gap-2 self-start">
            {user.profilePhoto && (
              <img
                src={require(`../img/users/${user.profilePhoto}`)}
                className="h-8 w-8"
              />
            )}
            <div className="flex flex-col">
              <span className="menu-text">Signed in as</span>
              <span className="menu-text font-bold">{user.username}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
