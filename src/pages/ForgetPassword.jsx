import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { OAuth } from "../components/OAuth";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  console.log(email);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Cannot send Reset Link");
    }
  };

  return (
    <section className="max-w-[1000px] mx-auto px-5 py-5">
      <h2 className="text-center font-semibold pb-5">Forgot Password</h2>
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
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="Email address"
              required
              className="border border-blue-300 focus:outline-none focus:border-blue-500 w-full px-4 rounded-md text-sm py-2"
            />
            <div className="text-sm py-5 flex justify-between whitespace-nowrap">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-500 font-semibold">
                  Register
                </Link>
              </p>

              <p className="text-blue-500 font-semibold ml-auto">
                <Link to="/signin">Sign in instead</Link>
              </p>
            </div>
            <button className="bg-blue-500 text-white font-medium w-full py-2  text-sm rounded-md hover:bg-blue-600 transition duration-150 ease-in-out active:bg-blue-800 hover:shadow-md">
              SEND RESET PASSWORD
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
