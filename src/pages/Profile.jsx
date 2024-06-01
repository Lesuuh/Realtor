// import { getAuth, signOut } from "firebase/auth";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {

  const auth = getAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });


  // destructuring the details from the formData
  const { name, email } = formData;


  // function to log out the user
  const onLoggedOut = () => {
    auth.signOut()
    navigate("/")
  };

  return (
    <>
      <section className="px-4">
        <h1 className="text-2xl text-center mt-6 font-bold">My Profile</h1>
        <div className="mt-6 px-3 w-full md:flex md:justify-center md:align-center">
          <form>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              disabled
              className="w-full px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled
              className="px-4 py-1 border border-gray-300 w-full bg-white text-gray-700 mt-5 rounded"
            />
            <div className="flex mt-5 whitespace-normal sm:text-lg text-sm mb-6">
              <p>Do you want to change your name?
              <span className="text-red-500 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">Edit</span></p>
              
              <p onClick={onLoggedOut} className="ml-auto text-blue-500 font-bold hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer">Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
    // <div className="flex items-center justify-center w-full h-[100dvh] flex-col">
    //   Profile
    //   <button
    //     onClick={logOut}
    //     className="bg-red-500 px-4 py-2 text-white rounded-md "
    //   >
    //     Log Out
    //   </button>
    // </div>
  );
};
