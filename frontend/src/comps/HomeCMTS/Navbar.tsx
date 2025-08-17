import { useState, useRef } from "react";
import useAuthUser from "@/hooks/AuthHooks/useAuthUser";
import logo from "../../assets/logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <header className="flex justify-between items-center px-4 py-4">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="PCompare Logo" className="h-10" />
        <span className="font-bold text-lg">PCompare</span>
      </div>
      <nav className="space-x-10 text-lg font-semibold flex items-center">
        <Link to={"/"}  className="hover:text-blue-600">
          Home
        </Link>
        <Link to={"/about-us"} className="hover:text-blue-600">
          About Us
        </Link>
        <Link to={"/service"} className="hover:text-blue-600">
          Service
        </Link>
        <Link to={"/Contact"} className="hover:text-blue-600">
          Contact Us
        </Link>
        {authUser?.user ? (
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="relative flex flex-col items-center mr-8">
              <IoMdNotificationsOutline className="h-8 w-8 text-gray-600" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                10
              </span>
            </div>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="relative"
                tabIndex={0}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <Link to={"/account/personal-info"}>
                  <img
                    src={authUser.user.avatar}
                    alt={authUser.user.name || "User Avatar"}
                    className="h-14 w-14 rounded-full object-cover border-2 border-blue-600"
                  />
                </Link>
              </div>
              {showDropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-xl shadow-lg py-4 z-50 flex flex-col space-y-4 text-gray-700 text-lg">
                  <Link
                    to="/account/settings"
                    className="px-6 py-2 hover:bg-gray-100"
                  >
                    Setting
                  </Link>
                  <Link
                    to="/account/personal-info"
                    className="px-6 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/account/albums"
                    className="px-6 py-2 hover:bg-gray-100"
                  >
                    Albums
                  </Link>
                  <Link
                    to="/account/favourite"
                    className="px-6 py-2 hover:bg-gray-100"
                  >
                    Favourite
                  </Link>
                </div>
              )}
            </div>
            <span className="font-medium">{authUser.user.name}</span>
          </div>
        ) : (
          <button
            className="bg-[#0c1c64] text-white px-8 py-2 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
