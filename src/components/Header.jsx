import { Link, Outlet, useLocation } from "react-router-dom";
import {
  MdCloseFullscreen,
  MdOutlineAccountCircle,
  MdOutlineMenu,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
// import { getAuth } from "firebase/auth";

export const Header = () => {
  const [menu, setMenu] = useState(false);

  const location = useLocation();

  // function to check the pathname and return true
  const RoutePathName = (routes) => {
    if (routes === location.pathname) {
      return true;
    }
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  // // firebase

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const auth = getAuth();
  //     const user = auth.currentUser;
  //     if (user !== null) {
  //       setDisplayName(user.displayName);
  //     } else {
  //       setDisplayName("Sign-In");
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <>

    {/* header */}
      <div className={`z-10 glass-header border-b shadow-sm sticky top-0 `}>
        <div className="flex h-[60px]  items-center justify-between px-3 sm:px-16 max-w-6xl mx-auto ">
          <div onClick={() => handleMenu()} className={`sm:hidden pr-2`}>
            {menu ? (
              <span>
                <MdCloseFullscreen size={25} />
              </span>
            ) : (
              <span>
                <MdOutlineMenu size={25} />
              </span>
            )}
          </div>
          <div className="mr-auto">
            <Link to="/">
              <h2 className="text-red-500 text-xl font-semibold ">
                Real<span className="text-black">tors</span>
              </h2>
            </Link>
          </div>

          {/* full screen */}
          <nav className="flex items-center">
            <ul className={`hidden sm:flex gap-5`}>
              <li
                className={`hover:underline hover:underline-offset-8 hover:text-red-500 text-sm font-semibold ${
                  RoutePathName("/") && "font-bold text-red-500"
                }`}
              >
                <Link to="/" onClick={() => setMenu(false)}>
                  Home
                </Link>
              </li>

              <li
                className={`hover:underline hover:underline-offset-8 hover:text-red-500 text-sm font-semibold ${
                  RoutePathName("/offers") && "font-bold text-red-500"
                }`}
              >
                <Link to="/offers" onClick={() => setMenu(false)}>
                  Offers
                </Link>
              </li>

              <li
                className={` hover:underline hover:underline-offset-8 hover:text-red-500 text-sm font-semibold ${
                  RoutePathName("/signin") && "font-bold text-red-500"
                }`}
              >
                <Link to="/signin" onClick={() => setMenu(false)}>
                  Sign-In{" "}
                </Link>
              </li>
              <li
                className={` hover:underline hover:underline-offset-8 hover:text-red-500 text-sm font-semibold ${
                  RoutePathName("/profile") && "font-bold text-red-500"
                }`}
              >
                <Link to="/profile" onClick={() => setMenu(false)}>
                  Profile{" "}
                </Link>
              </li>
            </ul>
          </nav>
          {/* mobile screen */}
          <nav className="">
            <ul
              className={`flex sm:hidden gap-5 text-sm px-5 py-5 ${
                menu
                  ? "flex left-0  justify-start items-start "
                  : "-left-[100%] ease-in "
              } absolute top-[60px] duration-300 ease-in  bg-gray-900 text-white h-[100dvh] w-[70%] flex-col  `}
            >
              <li className="hover:underline hover:underline-offset-8 hover:text-red-500">
                <Link
                  to="/"
                  onClick={() => setMenu(false)}
                  className="flex gap-1 items-center justify-center"
                >
                  <FaHome /> Home
                </Link>
              </li>

              <li className="hover:underline hover:underline-offset-8 hover:text-red-500">
                <Link to="/offers" onClick={() => setMenu(false)}>
                  Offers
                </Link>
              </li>
              <li className="hover:underline hover:underline-offset-8 hover:text-red-500">
                <Link to="/signin" onClick={() => setMenu(false)}>
                  Sign in
                </Link>
              </li>
            </ul>
            <Link to="/profile" className="sm:hidden">
              <MdOutlineAccountCircle size={25} />
            </Link>
          </nav>
        </div>
      </div>

      {/* other routes */}
      <main>
        <Outlet />
      </main>
    </>
  );
};
