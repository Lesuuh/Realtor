import { useState } from "react";
import { Link } from "react-router-dom";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  console.log(email);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className="max-w-[1000px] mx-auto px-5 py-5">
      <h2 className="text-center font-semibold pb-5">Forgot Password</h2>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 items-center">
        <div className="image-container md:w-1/2">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div>
          <form action="" >
            <input
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="Email address"
              className="border border-blue-300 focus:outline-none focus:border-blue-500 w-full px-4 rounded-md text-sm py-2"
            />
            <div className="text-sm py-5 flex justify-start">
              <p>
                Don't have an account?{" "}
                <span className="text-red-500 font-semibold ml-1">
                  <Link to="/signup">Register</Link>
                </span>{" "}
              </p>

              <span className="text-blue-500 font-semibold ml-auto">
                <Link to="/signin">Sign in instead</Link>
              </span>
            </div>
            <button className="bg-blue-500 w-full py-2 font-semibold text-sm rounded-md">
              Send Reset Email
            </button>
          </form>
          <div className="flex items-center py-4 before:border-t before:border-gray-300 before:flex-1 after:border-b after:border-gray-300 after:flex-1">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <button className="bg-red-500 text-white w-full py-2 font-semibold text-sm rounded-md">
            Continue with Google
          </button>
        </div>
      </div>
    </section>
  );
};
