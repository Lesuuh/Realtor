import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const navigate = useNavigate()
  const auth = getAuth();
  // const [geoLocation, setGeoLocation] = useState(true)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "sell",
    name: "",
    bath: 1,
    bed: 1,
    parking: false,
    furnished: false,
    address: "",
    desc: "",
    offer: false,
    regular: 0,
    discounted: 0,
    images: [],
    // latitude: 0,
    // longitude: 0,
  });

  const {
    type,
    name,
    bath,
    bed,
    parking,
    furnished,
    address,
    desc,
    offer,
    regular,
    discounted,
    // latitude,
    // longitude,
    images,
  } = formData;

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: files,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // discounted > regular
    if (+discounted >= +regular) {
      setLoading(false);
      toast.error("Discounted price cannot be greater than regular price");
      return;
    }

    // images > 6
    if (images.length > 6) {
      setLoading(false);
      toast.error("images should bot be more than 6");
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    // note that we get the url of the image and store it in storage because firestore cannot store the type of image files
    // so we get the url and store the url in the firestore database

    const imgURLs = [];
    try {
      const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      );
      imgURLs.push(...imgUrls);
      // toast.success("Images uploaded successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Images not Uploaded");
      return;
    }

    const formDataCopy = {
      ...formData,
      imgURLs,
      timestamp: serverTimestamp(),
    };

    !formDataCopy.offer && delete formDataCopy.discounted;
    delete formDataCopy.images;

    try {
      const docRef = await addDoc(collection(db, "listings"), formDataCopy);
      toast.success("Listing created successfully");
      setLoading(false);
      navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    } catch (error) {
      console.log(error);
      toast.error("An error occured" + error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="px-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mt-6">Create Listing</h1>
      <form onSubmit={handleSubmit}>
        {/* SALE AND RENT */}
        <p className="text-lg mt-6 font-semibold">Sell/Rent</p>
        <div className="w-full flex flex-row gap-5">
          <button
            type="button"
            id="sell"
            name="sell"
            value={type}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                type: "sell",
              }))
            }
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              type === "sell" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            Sell
          </button>

          <button
            type="button"
            id="rent"
            name="rent"
            value={type}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                type: "rent",
              }))
            }
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              type === "rent" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            Rent
          </button>
        </div>

        {/* NAME */}
        <div className="flex flex-col mt-5">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            placeholder="Name"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            maxLength={32}
            minLength={10}
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-200 focus:text-gray-900 focus:border-slate-600 mb-6"
          />
        </div>

        {/* BATHS AND BED */}
        <div className="w-full flex flex-row gap-5 mb-6">
          <div className="flex flex-col">
            <label htmlFor="bed" className="font-bold" value={bed}>
              Bed
            </label>
            <input
              type="number"
              name="bed"
              id="bed"
              value={bed}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  bed: e.target.value,
                }))
              }
              required
              min="1"
              max="50"
              className="py-2 px-4 w-full text-gray-700  rounded transition ease-in-out duration-  focus:shadow-md focus:border-slate-700 bg-white border border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bath" className="font-bold" value={bath}>
              Bath
            </label>
            <input
              type="number"
              name="bath"
              id="bath"
              value={bath}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  bath: e.target.value,
                }))
              }
              required
              min="1"
              max="50"
              className="py-2 px-4 w-full text-gray-700  rounded transition ease-in-out duration-  focus:shadow-md focus:border-slate-700 bg-white border border-gray-700"
            />
          </div>
        </div>

        {/* PARKING SPOT */}
        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className="w-full flex flex-row gap-5">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                parking: true,
              }))
            }
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              parking ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            id="packing-no"
            value={false}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                parking: false,
              }))
            }
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              !parking ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        {/* FURNISHED */}
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="w-full flex flex-row gap-5">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                furnished: true,
              }))
            }
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              furnished ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            id="packing-no"
            value={false}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                furnished: false,
              }))
            }
            className={`bg-gray-900  py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              !furnished ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col mt-6">
          <label htmlFor="name" className="font-bold">
            Address
          </label>
          <textarea
            type="text"
            name="address"
            value={address}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                address: e.target.value,
              }))
            }
            id="address"
            placeholder="Address"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-200 focus:text-gray-900 focus:border-slate-600 mb-6"
          />
        </div>
        {/* {!geoLocation && (
          <div>
            <div>
              <p>Latitude</p>
              <input type="number" id="latitude" value={latitude} required onChange={(e)=> setGeoLoact}/>
            </div>
          </div>
        )} */}

        {/* DESCRIPTION */}

        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold">
            Description
          </label>
          <textarea
            type="text"
            name="desc"
            value={desc}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                desc: e.target.value,
              }))
            }
            id="desc"
            placeholder="Description"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-200 focus:text-gray-900 focus:border-slate-600 mb-6"
          />
        </div>

        {/* OFFER */}
        <p className="text-lg font-semibold">Offers</p>
        <div className="w-full flex flex-row gap-5">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                offer: true,
              }))
            }
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              offer ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            id="offer"
            value={false}
            onClick={() =>
              setFormData((prevState) => ({
                ...prevState,
                offer: false,
              }))
            }
            className={`bg-gray-900  py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              !offer ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        {/* REGULAR PRICE */}
        <div className="mt-6 ">
          <p className="text-lg font-semibold">Regular Price</p>
          <div className="flex flex-row w-full justify-start items-center gap-5">
            <input
              type="number"
              name="regular"
              id="regular"
              value={regular}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  regular: e.target.value,
                }))
              }
              min="50"
              max="400000000"
              required
              className="w-[50%] px-4 py-2 text-center"
            />
            {type === "rent" && <span>$/month</span>}
          </div>
        </div>

        {/* DISCOUNTED PRICE */}
        {offer && (
          <div className="mt-6">
            <p className="text-lg font-semibold">Discounted Price</p>
            <input
              type="number"
              name="discounted"
              id="discounted"
              value={discounted}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  discounted: e.target.value,
                }))
              }
              min="50"
              max="400000000"
              required
              className="w-[50%] px-4 py-2 text-center mb-6"
            />
          </div>
        )}

        {/* IMAGES */}
        <div className="mb-6 mt-6">
          <p className="font-bold text-lg">Images</p>
          <p className="text-gray-600 text-sm">
            The first image will be the cover image (max 6)
          </p>
          <input
            type="file"
            name="image"
            id="image"
            accept=".jpg, .png, .jpeg"
            multiple
            required
            onChange={handleImageChange}
            className="border border-gray-700 border-spacing-1 px-1 py-1 rounded bg-white w-full focus:bg-white focus:border-slate-600 cursor-pointer"
          />
        </div>
        <input
          type="submit"
          value="Create Listing"
          className="w-full bg-blue-600 text-white py-2 font-bold hover:bg-blue-800 rounded focus:bg-blue-900 transition duration-200 ease-in-out mb-10 shadow-lg cursor-pointer"
        />
      </form>
    </main>
  );
}

export default CreateListing;
