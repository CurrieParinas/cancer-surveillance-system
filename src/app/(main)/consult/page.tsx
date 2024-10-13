"use client";
import React from "react";

const ConsultPage = () => {

 // Handle form submission
 const handleSubmit = (e: any) => {
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
            <p className="mt-10 font-bold text-5xl text-red-900">CONSULT</p>
        </div>
      
        <div className="h-auto flex-none">
            <div className="grid grid-cols-4 gap-4 flex-none">

            {/* TOP LEFT box*/}
            <div className="col-span-2 bg-white p-4 text-center shadow-md rounded"> 
            
                
                <div className="grid grid-cols-2 grid-flow-col ">
                    {/* name, age, diagnosis column */}
                    <div className="p-4 pl-12 grid grid-flow-row  cols-span-1 justify-items-start">
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Name:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Age:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Diagnosis:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Operation:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Chemotherapy:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Radiotherapy:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Hormonal Therapy:
                            </label>
                        </div>
                    </div>

                    {/*Lastname, Firstname Middlename column */}
                    <div className="pt-4 pb-4 pr-2 grid grid-flow-row  justify-items-start">
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Lastname, Firstname Middlename
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Currentdate - Birthdate
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Diagnosis + Stage + Laterality
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Surgery + Date
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Yes/No, Completed/Not Completed
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Yes/No, Completed/Not Completed
                        </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Yes/No, Completed/Not Completed
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOP RIGHT box*/}
            <div className="col-span-2 bg-white p-4 text-center shadow-md rounded">
                <div className="grid grid-cols-2 grid-flow-col ">
                {/* Patient Status column*/}
                    <div className="p-4 pl-12 grid grid-flow-row  cols-span-1 justify-items-start gap-1">
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Patient Status:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Latest Consult Date:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Latest Labs submitted:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Submission Date:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Patient Si/Sx Report:
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Patient Report Date:
                            </label>
                        </div>
                    </div>
            {/* Placeholder column*/}
            <div className="p-4 pl-12 grid grid-flow-row  cols-span-1 justify-items-start gap-1">
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                                Placeholder
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Placeholder
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Placeholder
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Placeholder
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Placeholder
                            </label>
                        </div>
                        <div className="">
                            <label className="font-bold text-left text-sm text-black ">
                            Placeholder
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* SUBMISSION box */}
            <div className="flex-none col-span-3 bg-gray-100 p-4 h-100%">
                {/* text and input */}
                <div className="grid grid-cols-3 grid-flow-col">

                    {/* label col */}
                    <div className="p-4 pl-16 grid grid-flow-row col-span-1 justify-items-start gap-1 order-1">
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        SUBJECTIVE
                        </label>
                    </div>
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        OBJECTIVE
                        </label>
                    </div>
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        SURVEILLANCE WORKUP
                        </label>
                    </div>
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        PLAN
                        </label>
                    </div>
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        PATIENT STATUS
                        </label>
                    </div>
                    </div>

                    {/* input col */}
                    <div className="p-4 grid grid-flow-row col-span-2 justify-items-inline gap-2 order-2">
                    <div className="h-16">
                        <input
                        type="text"
                        name="subjective_text"
                        className="p-1 h-16 bg-gray-400 rounded text-sm text-gray-950 size-full"
                        />
                    </div>
                    <div className="h-16">
                        <input
                        type="text"
                        name="subjective_text"
                        className="p-1 h-16 bg-gray-400 rounded text-sm text-gray-950 size-full"
                        />
                    </div>
                    <div className="h-16">
                        <input
                        type="text"
                        name="subjective_text"
                        className="p-1 h-16 bg-gray-400 rounded text-sm text-gray-950 size-full"
                        />
                    </div>
                    <div className="h-16">
                        <input
                        type="text"
                        name="subjective_text"
                        className="p-1 h-16 bg-gray-400 rounded text-sm text-gray-950 size-full"
                        />
                    </div>
                    <div className="h-16">
                        <input
                        type="text"
                        name="subjective_text"
                        className="p-1 h-16 bg-gray-400 rounded text-sm text-gray-950 size-full"
                        />
                    </div>
                    </div>
                </div>

                {/* Small submit button under both columns */}
                <div className="p-4 flex justify-center">
                    <button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white px-8 py-2 rounded shadow">
                    SUBMIT
                    </button>
                </div>
            </div>


            {/* BUTTONS*/}
            <div className="col-span-1 bg-white p-4">
            <div className="grid grid-cols-1 grid-flow-col ">
                <div className="flex flex-col gap-4">
                <button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">UPDATE PATIENT INFO</button>
                <button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">PRESCRIPTION</button>
                <button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">LAB REQUEST</button>
                <button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">CLINICAL ABSTRACT</button>
                <button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">MED CERTIFICATE</button>
                <button type="submit"className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">REFERRAL FORM</button>
                </div>
                </div>
            </div>

            </div>
       
        </div>
        
    </div>
  );
};

export default ConsultPage;
