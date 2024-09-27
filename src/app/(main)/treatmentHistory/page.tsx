"use client";

import React, { useState } from "react";

const TreatmentHistoryForm = () => {
  // State to manage the current page (1: Treatment History, 2: Chemotherapy, 3: Radiotherapy)
  const [currentPage, setCurrentPage] = useState(1);

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
  };

  // Function to go to the next page
  const handleNext = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to display the correct page title
  const renderPageTitle = () => {
    switch (currentPage) {
      case 1:
        return "TREATMENT HISTORY";
      case 2:
        return "CHEMOTHERAPY";
      case 3:
        return "RADIOTHERAPY";
      default:
        return "";
    }
  };

  // Function to render the correct form content based on the current page
  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div>
            {/* Treatment History Form */}
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
          </div>
        );
      case 2:
        return (
          <div>
            {/* Chemotherapy Form */}
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

            <div className="w-full bg-gray-300 p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  CHEMOTHERAPY TYPE:
                </label>
                <input
                  type="text"
                  name="chemotherapy_type"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                  placeholder="Enter chemotherapy type"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  CHEMOTHERAPY GIVEN:
                </label>
                <input
                  type="text"
                  name="chemotherapy_given"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                  placeholder="Enter chemotherapy given"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  INITIAL CHEMOTHERAPY DATE:
                </label>
                <input
                  type="date"
                  name="initial_chemotherapy_date"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  LAST CHEMOTHERAPY DATE:
                </label>
                <input
                  type="date"
                  name="last_chemotherapy_date"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  CHEMOTHERAPY NO. OF CYCLES:
                </label>
                <input
                  type="text"
                  name="chemotherapy_cycles"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                  placeholder="Enter number of cycles"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  CHEMOTHERAPY FACILITY:
                </label>
                <input
                  type="text"
                  name="chemotherapy_facility"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                  placeholder="Enter chemotherapy facility"
                />
              </div>
            </div>

            {/* Immunotherapy Section */}
            <div className="w-full bg-gray-300 p-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  IMMUNOTHERAPY:
                </label>
                <input
                  type="text"
                  name="immunotherapy"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                  placeholder="Enter immunotherapy"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  INITIAL IMMUNOTHERAPY DATE:
                </label>
                <input
                  type="date"
                  name="initial_immunotherapy_date"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  LAST IMMUNOTHERAPY DATE:
                </label>
                <input
                  type="date"
                  name="last_immunotherapy_date"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  IMMUNOTHERAPY NO. OF CYCLES:
                </label>
                <input
                  type="text"
                  name="immunotherapy_cycles"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                  placeholder="Enter number of cycles"
                />

                <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                  IMMUNOTHERAPY FACILITY:
                </label>
                <input
                  type="text"
                  name="immunotherapy_facility"
                  className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                  placeholder="Enter immunotherapy facility"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
          {/* Treatment History Form */}
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
                RADIOTHERAPY TYPE:
              </label>
              <input
                type="text"
                name="radiotherapy_type"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter radiotherapy type"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                INITIAL RADIOTHERAPY DATE:
              </label>
              <input
                type="date"
                name="initial_radiotherapy_date"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                LAST RADIOTHERAPY DATE:
              </label>
              <input
                type="date"
                name="last_radiotherapy_date"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
               RADIOTHERAPY DOSE:
              </label>
              <input
                type="text"
                name="radiotherapy_dose"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter radiotherapy dose"
              />

              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                RADIOTHERAPY BODY SITE:
              </label>
              <input
                type="text"
                name="radiotherapy_body_site"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter radiotherapy body site"
              />
              <label className="pl-36 pt-1 font-bold text-left text-sm text-black">
                RADIOTHERAPY FACILITY:
              </label>
              <input
                type="text"
                name="radiotherapy_facility"
                className="p-1 border border-gray-300 rounded w-3/5 text-sm h-8 text-gray-950"
                placeholder="Enter radiotherapy facility"
              />
            </div>
          </div>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen-minus-1-6 bg-white flex flex-col items-center justify-center gap-4">
      {/* Page Title */}
      <div className="w-6/12 h-auto p-2 text-center">
        <p className="mt-10 font-bold text-6xl text-red-900">{renderPageTitle()}</p>
      </div>

      {/* Form */}
      <div className="w-10/12 h-auto p-4 grid bg-zinc-100">
        <form className="gap-2" onSubmit={handleSubmit}>
          {renderPageContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 mb-8">
            <button
              type="button"
              onClick={handleBack}
              className={`hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-10 text-sm ml-72 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              BACK
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={`hover:bg-primary/90 bg-red-900 text-white font-semibold shadow py-2 px-10 text-sm mr-96 ${
                currentPage === 3 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 3}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreatmentHistoryForm;
