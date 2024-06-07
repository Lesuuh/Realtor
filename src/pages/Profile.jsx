// import { toast } from "react-toastify";

import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

export const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  // destructuring the details from the formData
  const { name, email } = formData;

  // function to log out the user
  const onLoggedOut = () => {
    auth.signOut();
    navigate("/");
  };

  // function to change the value of the text field
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  // function to submit the edited form to firebase
  async function onSubmit(e) {
    e.preventDefault();
    try {
      // update the change in the auth
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      // update in the firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, { name });

      toast.success("Updated Successfully");
    } catch (error) {
      toast.error("Could not update details");
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const qSnap = await getDocs(q);
      let listings = [];
      qSnap.forEach((doc) => {
        return listingRef.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section className="">
        <h1 className="text-2xl text-center mt-6 font-bold">My Profile</h1>
        <div className="mt-6 px-3 md:max-w-[50%]  mx-auto flex-col md:flex md:justify-center md:align-center">
          <form>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-1 text-gray-700 bg-white border ${
                changeDetail ? "outline-red-500 border-red-500" : ""
              } border-gray-300 rounded transition ease-in-out`}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled
              className="px-4 py-1 border border-gray-300 w-full bg-white text-gray-700 mt-5 rounded"
            />
            <div className="flex mt-5 sm:text-lg text-sm mb-6">
              <p>
                Do you want to change your name?
                <span
                  onClick={() => {
                    onSubmit, setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-500 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Go on then" : "Edit"}
                </span>
              </p>

              <p
                onClick={onLoggedOut}
                className="ml-auto text-blue-500 font-bold hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
            <button
              onClick={onSubmit}
              className={`bg-gray-900 text-white text-sm rounded px-5 py-1 ${
                !changeDetail ? "hidden" : "flex"
              }`}
            >
              Apply Changes
            </button>
          </form>
          <Link to="/create-listing">
            <button
              type="submit"
              className="w-full flex px-4 py-1 mt-10 justify-center items-center gap-3 rounded font-medium bg-blue-600 text-white outline-none uppercase hover:bg-blue-800 shadow-sm hover:shadow-lg transition ease-in-out duration-200 cursor-pointer"
            >
              <FcHome />
              Sell or rent your home
            </button>
          </Link>
        </div>
      </section>
      {!loading && listings.length > 0 && (
        <>
          <h1 className="text-2xl text-center font-semibold">My Listings</h1>
          <ul>
            {listings.map((listing) => {
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
              />;
            })}
          </ul>
        </>
      )}
    </>
  );
};
