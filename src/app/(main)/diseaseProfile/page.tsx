"use client";

import React from "react";

const DiseaseProfile = () => {
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

    // You can now send jsonData via an API request using fetch or axios
    // fetch('your-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: jsonData,
    // });
  };

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-6/12 h-auto p-2 text-center">
        <p className="mt-10 font-bold text-6xl text-red-900">DISEASE PROFILE</p>
      </div>

      <div className="w-10/12 h-auto p-4 bg-zinc-100">
        <form className="gap-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-1">
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

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              PRIMARY SITE:
            </label>
            <input
              type="text"
              name="primary_site"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter primary site"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              DATE OF DIAGNOSIS:
            </label>
            <input
              type="date"
              name="date_of_diagnosis"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter date of diagnosis"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              BASIS OF DIAGNOSIS:
            </label>
            <input
              type="text"
              name="basis_of_diagnosis"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter basis of diagnosis"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              LATERALITY:
            </label>
            <input
              type="text"
              name="laterality"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter laterality"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              HISTOLOGY:
            </label>
            <input
              type="text"
              name="histology"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter histology"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              EXTENT OF DISEASE:
            </label>
            <input
              type="text"
              name="extent_of_disease"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter extent of disease"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              TUMOR SHIFT:
            </label>
            <input
              type="text"
              name="tumor_shift"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter tumor size"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              NODAL INVOLVEMENT:
            </label>
            <input
              type="text"
              name="nodal_involvement"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter nodal involvement"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              METASTASIS:
            </label>
            <input
              type="text"
              name="metastasis"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter metastasis"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              METASTATIC SITE:
            </label>
            <input
              type="text"
              name="metastatic_site"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter metastatic site"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              MULTIPLE PRIMARIES:
            </label>
            <input
              type="text"
              name="multiple_primaries"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter multiple primaries"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              OTHER PRIMARY:
            </label>
            <input
              type="text"
              name="other_primary"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter other primary"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              STAGE:
            </label>
            <input
              type="text"
              name="stage"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter stage"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              STAGE TYPE:
            </label>
            <input
              type="text"
              name="stage_type"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter stage type"
            />

            <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
              PATIENT STATUS:
            </label>
            <input
              type="text"
              name="patient_status"
              className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              placeholder="Enter patient status"
            />
          </div>

          <div className="flex mt-8 mb-8">
            <button type="submit" className="hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-10 text-sm mr-24 ml-40">
              SUBMIT
            </button>
            <button type="button" className="hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-8 ml-32 mr-32 text-sm">
              SUBMIT & ADD TREATMENT HISTORY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiseaseProfile;
