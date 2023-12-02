import { Link, NavLink } from "react-router-dom";
import whiteLogo from "../img/logo/default-monochrome-white.svg";
import { useUserContext } from "../contexts/UserContext";

export default function Header() {
  const { user } = useUserContext();
  return (
    <>
      <div
        className="flex min-h-fit w-full flex-1 items-start
				justify-center bg-[url('./img/landing-bg.jpg')] bg-cover bg-center lg:flex-none lg:items-center lg:justify-between lg:bg-none"
      >
        <div className="w-[25%]">
          <Link to="/places">
            <button
              type="button"
              className="m-4 hidden border-4 border-sky-900 px-8 py-4 text-xl text-sky-900 lg:block"
            >
              <b>Explore</b>
            </button>
          </Link>
        </div>
        <Link to="/" className="mt-5 w-[50%] lg:m-0 lg:max-w-[25%] lg:flex-1">
          <img
            src={whiteLogo}
            alt="next travel"
            className=" custom-drop-shadow"
          />
        </Link>
        {user.username === undefined ? (
          <div className="mr-[2%] flex w-[25%] min-w-fit justify-end gap-5">
            <NavLink to="/login">
              <button
                type="button"
                className=" rounded-2xl border-2 border-white px-8 py-2 text-xl text-white lg:block "
              >
                <b>Login</b>
              </button>
            </NavLink>
            <NavLink to="/register">
              <button
                type="button"
                className=" rounded-2xl border-2 border-white px-8 py-2 text-xl text-white lg:block"
              >
                <b>Register</b>
              </button>
            </NavLink>
          </div>
        ) : (
          <Link to={`/user/${user.username}`}>
            <div className="mr-[2%] flex w-[25%] min-w-fit justify-end gap-5 text-white">
              {user.username}
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
