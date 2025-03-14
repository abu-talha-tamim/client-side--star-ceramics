import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar  max-w-screen w-6xl bg-black text-white shadow-sm fixed z-10 opacity-90">
      <div className="container mx-auto flex justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide uppercase">
          STAR -<span className="text-primary font-bold text-xl"> T</span>{" "}
          <br />
          <span className="text-gray-400 text-sm">C E R A M I C</span>
        </Link>

        {/* Navigation & User Options */}
        <div className="flex items-center gap-4">
          {/* Dropdown Menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <AiOutlineMenu size={24} />
            </div>
            <ul className="menu menu-sm dropdown-content bg-white text-black rounded-box shadow-md mt-3 w-52 p-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/cart">Dashboard</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              {user && (
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              )}
            </ul>
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content bg-white text-black rounded-box shadow-md mt-3 w-52 p-2">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              {user && (
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              )}
            </ul>
          </div>

          {/* Login/Logout Button */}
          <ul>
            {user ? (
              <li>
                <button onClick={handleLogOut} className="btn btn-ghost">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
