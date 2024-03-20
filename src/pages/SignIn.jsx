import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { OAuth } from "../components/OAuth";

export const SignIn = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [mode, setMode] = useState(false);

  useDebounce(loginDetails, 3000);

  console.log(loginDetails);

  const handleChange = (e) => {
    setLoginDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // setting debounce
  function useDebounce(value, delay) {
    const [debounce, setDebounce] = useState();

    useEffect(() => {
      const handleTimeOut = setTimeout(() => {
        setDebounce(value);
      }, delay);

      return () => {
        clearTimeout(handleTimeOut);
      };
    }, [value, delay]);
    return debounce;
  }

  return (
    <section className="max-w-[1000px] mx-auto px-5 py-5">
      <h2 className="text-center font-semibold pb-5">Sign in</h2>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 items-center">
        <div className="image-container ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full">
          <form action="">
            <input
              type="email"
              value={loginDetails.email}
              name="email"
              onChange={handleChange}
              placeholder="Email address"
              className="border border-blue-300 focus:outline-none focus:border-blue-500 w-full px-4 rounded-md text-sm py-2"
            />
            <div className="pt-5 relative -z-10">
              <input
                type={mode ? "text" : "password"}
                value={loginDetails.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="border border-blue-300 focus:outline-none focus:border-blue-500 w-full px-4 rounded-md text-sm py-2"
              />
              <div
                onClick={() => setMode(!mode)}
                className="absolute top-1/2 right-2 cursor-pointer text-gray-500 hover:text-gray-900"
              >
                {mode ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <div className="">
              <div className="text-sm py-5 flex justify-between whitespace-nowrap">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-red-500 font-semibold ml-.5"
                  >
                    Register
                  </Link>
                </p>
                <Link to="/forgot-password">
                  <p className="text-end pb-5 text-sm hover:text-black text-blue-500">
                    Forgot Password?
                  </p>
                </Link>
              </div>
            </div>

            <button className="bg-blue-500 text-white font-medium w-full py-2  text-sm rounded-md hover:bg-blue-600 transition duration-150 ease-in-out active:bg-blue-800 hover:shadow-md">
              Sign-in
            </button>
          </form>
          <div className="flex items-center py-4 before:border-t before:border-gray-300 before:flex-1 after:border-b after:border-gray-300 after:flex-1">
            <p className="text-center font-medium mx-4">OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  );
};
