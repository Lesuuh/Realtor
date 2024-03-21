import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const OAuth = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const signUp = async () => {
    setLoading(true)
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      // checking if the user exits in the database and if it does get the user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // if it doesnt exist
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false)
  };

  return (
    <button
    type="button"
      onClick={signUp}
      className="bg-red-500 flex items-center justify-center text-white font-medium w-full py-2  text-sm rounded-md hover:bg-red-600 transition duration-150 ease-in-out active:bg-red-800 hover:shadow-md"
    >
      <FcGoogle className="mr-2 bg-white rounded-full" size={15} />
      {loading ? "Loading..." : "Continue with Google"}
    </button>
  );
};
