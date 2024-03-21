import { getAuth, signOut } from "firebase/auth";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Profile = () => {
  const navigate = useNavigate();

  const logOut = () => {
    try {
      const auth = getAuth();
      signOut(auth).then(() => {
        toast.success("User Logged Out");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[100dvh] flex-col">
      Profile
      <button
        onClick={logOut}
        className="bg-red-500 px-4 py-2 text-white rounded-md "
      >
        Log Out
      </button>
    </div>
  );
};
