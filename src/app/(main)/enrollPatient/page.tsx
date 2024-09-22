"use client";

import React from "react";

const EnrollPatient = () => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a new FormData object
    const formData = new FormData(e.target);

    // Convert FormData to an object
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // Convert the object to a JSON string
    const jsonData = JSON.stringify(formDataObj);

    // Log the JSON to the console
    console.log(jsonData);

    // Optionally, send the JSON data via fetch or axios
    // fetch('your-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: jsonData,
    // });
  };

  return (
    <div className="w-screen-minus-1-6 bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-6/12 h-auto p-2 text-center">
        <p className="mt-10 font-bold text-5xl text-red-900">PATIENT ENROLLMENT</p>
      </div>

      <div className="w-6/12 h-auto p-4 bg-zinc-100">
        <form className="gap-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-1">
            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">LASTNAME:</label>
            <input
              type="text"
              name="lastname"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter lastname"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">FIRSTNAME:</label>
            <input
              type="text"
              name="firstname"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter firstname"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">MIDDLE NAME:</label>
            <input
              type="text"
              name="middle_name"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter middle name"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">EMAIL ADDRESS:</label>
            <input
              type="email"
              name="email"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter email address"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">PASSWORD:</label>
            <input
              type="password"
              name="password"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter password"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">BIRTHDATE:</label>
            <input
              type="date"
              name="birthdate"
              className="p-0.5 border border-gray-300 rounded w-3/4 text-sm h-8 text-gray-400"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">BIRTHPLACE:</label>
            <input
              type="text"
              name="birthplace"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter birthplace"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">GENDER:</label>
            <select name="gender" className="p-0.5 border border-gray-300 rounded w-3/4 text-gray-400 text-sm h-8">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">MARITAL STATUS:</label>
            <select name="marital_status" className="p-0.5 border border-gray-300 rounded w-3/4 text-gray-400 text-sm h-8">
              <option value="">Select marital status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">CURRENT ADDRESS:</label>
            <input
              type="text"
              name="current_address"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter current address"
            />

            <label className="pl-40 pt-1 font-bold text-left text-sm text-black">REGION:</label>
            <input
              type="text"
              name="region"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter region"
            />

            <label className="pl-40 pt-1 font-bold text-left text-sm text-black">CITY:</label>
            <input
              type="text"
              name="city"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter city"
            />

            <label className="pl-40 pt-1 font-bold text-left text-sm text-black">PROVINCE:</label>
            <input
              type="text"
              name="province"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm text-gray-950 h-8"
              placeholder="Enter province"
            />
          </div>

          <div className="flex justify-between mt-8 mb-8">
            <button type="submit" className="hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-8 text-sm mr-20 ml-20">
              SUBMIT
            </button>
            <button type="button" className="hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-6 mr-20 text-sm">
              SUBMIT & ADD DISEASE PROFILE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollPatient;
