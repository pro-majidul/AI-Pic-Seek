import { BiHome } from "react-icons/bi";
import { useContext } from "react";
import { CiGrid31 } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { GiBrain } from "react-icons/gi";

import { Link, NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
  const { user, logOut, login } = useContext(AuthContext);
  return (
    <div className="navbar  flex-col lg:flex-row">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-1 text-xl ">
          <span className="bg-gradient-to-r from-stone-300 to-cyan-600 bg-clip-text text-transparent">
            PIC-SEEK
          </span>
          <div>
            <img
              src="https://img.icons8.com/?size=96&id=8gR77jBNhfyz&format=png"
              alt=""
              width={20}
            />
          </div>
          <span className="text-cyan-600">AI</span>
        </Link>
      </div>
      <div className="flex-none ">
        <ul className="menu flex-1 flex-wrap justify-center menu-horizontal px-1 gap-1 lg:gap-5">
          <li>
            <NavLink
              to={"/"}
              className="border rounded-full border-gray-200 shadow px-4 py-2 bg-base-100"
            >
              {" "}
              <BiHome size={18}></BiHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/create"}
              className="border rounded-full border-gray-200 shadow px-4 py-2 bg-base-100"
            >
              {" "}
              <GiBrain size={18}></GiBrain> Create
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/creations"}
              className="border rounded-full border-gray-200 shadow px-4 py-2 bg-base-100"
            >
              {" "}
              <CiGrid31 size={18} /> Creations
            </NavLink>
          </li>

          {user && user?.email ? (
            <li>
              <button
                onClick={logOut}
                className="border rounded-full border-gray-200 shadow px-4 py-2 bg-base-100"
              >
                {" "}
                <CgLogOut></CgLogOut> Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={login}
                className="border rounded-full border-gray-200 shadow px-4 py-2 bg-base-100"
              >
                {" "}
                <FcGoogle size={18}></FcGoogle> Sign-In
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
