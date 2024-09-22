"use client";

import React from "react";

const TreatmentHistory = () => {
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

    // Optionally, send jsonData via fetch or axios
    // fetch('your-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: jsonData,
    // });
  };

  return (
    <div className="w-screen-minus-1-6 bg-white flex flex-col items-center justify-center gap-4">

      <div className="w-6/12 h-auto p-2 text-center">
        <p className="mt-10 font-bold text-6xl text-red-900">TREATMENT HISTORY</p>
      </div>


      <div className="w-10/12 h-auto p-4 grid bg-zinc-100">
        <form className="gap-2" onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-4 bg-zinc-100 p-4 mb-4">
            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              LASTNAME:
            </label>
            <input
              type="text"
              name="lastname"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter lastname"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              EMAIL ADDRESS:
            </label>
            <input
              type="email"
              name="email"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter email address"
            />
          </div>


          <div className="w-full bg-gray-300 p-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                TREATMENT PURPOSE:
              </label>
              <input
                type="text"
                name="treatment_purpose"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter treatment purpose"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                PRIMARY TREATMENT:
              </label>
              <input
                type="text"
                name="primary_treatment"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter primary treatment"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                INITIAL TREATMENT DATE:
              </label>
              <input
                type="date"
                name="initial_treatment_date"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                PLANNED ADDITIONAL TREATMENT:
              </label>
              <input
                type="text"
                name="planned_additional_treatment"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter additional treatment"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                SURGICAL OPERATION:
              </label>
              <input
                type="text"
                name="surgical_operation"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter surgical operation"
              />
              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                OPERATION DATE:
              </label>
              <input
                type="date"
                name="operation_date"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              />

            </div>
          </div>

          <div className="flex justify-between mt-8 mb-8">
            <button
              type="submit"
              className="hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-10 text-sm ml-72"
            >
              BACK
            </button>
            <button
              type="submit"
              className="hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-10 text-sm mr-96"
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreatmentHistory;
