import { useEffect, useState } from "react";

// REACT-ROUTER
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// FIREBASE
import { OAuth } from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// TOASTIFY
import { toast } from "react-toastify";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  // state for loading
  const [loading, setLoading] = useState(false);

  // destructuring the form details
  const { name, email, password } = formData;
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();

  useDebounce(formData, 3000);

  // console.log(formData);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // on submit function
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), {
        formDataCopy,
      });
      console.log(user);

      navigate("/");
    } catch (error) {
      toast.error("Email already exists");
      console.log(error.message)
    }
    setLoading(false);
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
      <h2 className="text-center font-semibold pb-5">Sign Up</h2>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 items-center">
        <div className="image-container ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full">
          <form action="" onSubmit={onSubmit}>
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
              placeholder="Fullname"
              required
              className="border mb-5 border-blue-300 focus:outline-none focus:border-blue-500 w-full px-4 rounded-md text-sm py-2"
            />
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Email address"
              required
              className="border border-blue-300 focus:outline-none focus:border-blue-500 w-full px-4 rounded-md text-sm py-2"
            />

            <div className="pt-5 relative z-0">
              <input
                type={mode ? "text" : "password"}
                value={formData.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
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
                  Have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-red-500 font-semibold ml-.5"
                  >
                    Sign-in
                  </Link>
                </p>

                <Link to="/forgot-password">
                  <p className="text-end pb-5 text-sm hover:text-black text-blue-500">
                    Forgot Password?
                  </p>
                </Link>
              </div>
            </div>

            <button className={`bg-blue-500 text-white font-medium w-full py-2  text-sm rounded-md hover:bg-blue-600 transition duration-150 ease-in-out active:bg-blue-800 hover:shadow-md ${loading ? "bg-blue-300 hover:bg-blue-300" : ""}`}>
              {loading ? "Loading..." : "Sign-up"}
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
