"use client";
import React from "react";

const MessagePage = () => {

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
            <p className="mt-10 font-bold text-5xl text-red-900">MESSAGE</p>
        </div>
      
        <div className="h-1/2 w-2/4 flex-none">
            <div className="grid grid-cols-1 gap-4 flex-none">

            {/* SUBMISSION box */}
            <div className="flex-none col-span-3 bg-gray-100 p-4 h-auto w-full">
                {/* text and input */}
                <div className="grid grid-cols-3 grid-flow-col">

                    {/* label col */}
                    <div className="p-4 pl-16 grid grid-flow-row col-span-1 justify-items-start gap-1 order-1">
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        TO:
                        </label>
                    </div>
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        SUBJECT:
                        </label>
                    </div>
                    <div className="content-center">
                        <label className="font-bold text-left text-sm text-black">
                        MESSAGE:
                        </label>
                    </div>
                    </div>

                    {/* input col */}
                    <div className="p-4 grid grid-flow-row col-span-2 justify-items-inline gap-2 order-2">
                    <div className="h-16">
                        <input
                        type="text"
                        name="TO_text"
                        className="p-1 h-16 bg-gray-300 rounded text-sm text-gray-950 size-full"
                        />
                    </div>
                    <div className="h-16">
                        <input
                        type="text"
                        name="SUBJECT_text"
                        className="p-1 h-16 bg-gray-300 rounded text-sm text-gray-950 size-full"
                        />
                    </div>
                    <div className="h-32">
                        <input
                        type="text"
                        name="MESSAGE_text"
                        className="p-1 h-full bg-gray-300 rounded text-sm text-gray-950 size-full"
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

            </div>
       
        </div>
        
    </div>
  );
};

export default MessagePage;
