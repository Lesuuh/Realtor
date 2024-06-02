import { useState } from "react";

function CreateListing() {
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
  } = formData;
  function onChange() {}
  return (
    <main className="px-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mt-6">Create Listing</h1>
      <form>
        {/* SALE AND RENT */}
        <p className="text-lg mt-6 font-semibold">Sell/Rent</p>
        <div className="w-full flex flex-row gap-5">
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              type === "rent" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            Sell
          </button>

          <button
            type="button"
            id="sell"
            value="sell"
            onClick={onChange}
            className={`bg-gray-900 py-2 rounded uppercase font-medium shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 max-w-[50%] w-full ${
              type === "sell" ? "bg-gray-900 text-white" : "bg-white text-black"
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
            onChange={onChange}
            placeholder="Name"
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
              onChange={onChange}
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
              onChange={onChange}
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
            onClick={onChange}
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
            onClick={onChange}
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
            onClick={onChange}
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
            onClick={onChange}
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
            id="address"
            onChange={onChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-200 focus:text-gray-900 focus:border-slate-600 mb-6"
          />
        </div>

        {/* DESCRIPTION */}

        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold">
            Description
          </label>
          <textarea
            type="text"
            name="desc"
            value={desc}
            id="desc"
            onChange={onChange}
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
            onClick={onChange}
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
            onClick={onChange}
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
              min="50"
              max="400000000"
              required
              onChange={onChange}
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
              min="50"
              max="400000000"
              required
              onChange={onChange}
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
              onChange={onChange}
              accept=".jpg, .png, .jpeg"
              multiple
              required
              className="border border-gray-700 border-spacing-1 px-1 py-1 rounded bg-white w-full focus:bg-white focus:border-slate-600 cursor-pointer"
            />
        </div>
        <input type="submit" value="Create Listing" className="w-full bg-blue-600 text-white py-2 font-bold hover:bg-blue-800 rounded focus:bg-blue-900 transition duration-200 ease-in-out mb-10 shadow-lg cursor-pointer"/>
      </form>
    </main>
  );
}

export default CreateListing;
