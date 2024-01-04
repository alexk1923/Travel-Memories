import { useEffect, useState } from "react";
import navbarLogo from "../img/logo/default-monochrome.svg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { NAVBAR_VARIANT } from "../constants";
import { useUserContext } from "../contexts/UserContext";
import { useLogout } from "../hooks/useLogout";

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
  const logout = useLogout();
  const navigate = useNavigate();
  const { variant } = props;
  const variantToStyle = {
    [NAVBAR_VARIANT.TRANSPARENT]: "bg-black/[.1]  backdrop-blur",
    [NAVBAR_VARIANT.SOLID]: "bg-primary",
  };
  return (
    <nav className={"flex w-full text-white " + variantToStyle[variant]}>
      <div className="flex w-screen items-center justify-between gap-4 px-8 py-4 lg:justify-between lg:px-[20%] ">
        <img
          src={navbarLogo}
          alt="logo"
          className="max-w-[50%] cursor-pointer md:max-w-[25%] lg:max-w-[25%]"
          onClick={() => navigate("/")}
        />

        {isLargeScreen ? (
          <>
            <ul className="justify-content text-body-1 mx-auto flex gap-5 font-semibold ">
              <li
                className="inline cursor-pointer"
                onClick={() => navigate("/")}
              >
                <span className="text-body">HOME</span>
              </li>
              <li
                className="inline cursor-pointer"
                onClick={() => navigate("/explore")}
              >
                <span className="text-body">EXPLORE</span>
              </li>
              <li
                className="inline cursor-pointer"
                onClick={() => navigate("/about")}
              >
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

        {isLargeScreen && (
          <div className="flex flex-col">
            <span></span>
          </div>
        )}

        {user.username && (
          <div className="absolute right-10 flex items-center gap-2 self-start">
            {user.profilePhoto && (
              <img
                src={require(`../img/users/${user.profilePhoto}`)}
                className="h-8 w-8"
                alt="user profile"
              />
            )}
            <div className="flex flex-col">
              <span className="menu-text">Signed in as</span>
              <span
                className="menu-text font-bold"
                onClick={() => navigate(`/user/${user.username}`)}
              >
                {user.username}
              </span>
            </div>
            <Button onClick={logout} variant="filled" text="Log out" />
          </div>
        )}
      </div>
    </nav>
  );
}
