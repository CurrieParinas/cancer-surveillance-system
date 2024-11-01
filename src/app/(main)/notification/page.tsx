"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const NotificationPage = () => {

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
            <p className="mt-10 font-bold text-5xl text-red-900">ALERTS</p>
        </div>
      
        <div className="h-1/2 w-3/5 flex-none">
            <div className="grid grid-cols-1 gap-1 flex-none">

          
            {/* SUBMISSION box */}
            <div className="flex-none col-span-1 bg-gray-100 p-4 h-full w-full">
                {/* text and input */}
                <div className="p-4 grid grid-cols-1 grid-flow-col text-black justify-center w-full">

                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                        <TableHead className="font-bold text-sm text-black bg-gray-300">Date</TableHead>
                        <TableHead className="font-bold text-sm text-black bg-gray-300">Sender</TableHead>
                        <TableHead className="font-bold text-sm text-black bg-gray-300">Message</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        <TableCell className="text-left text-sm text-black bg-white">PLACEHOLDER</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                </div>

                {/* Small submit button under both columns */}
                <div className="grid grid-cols-2 p-4 flex justify-center">
                <div className="col-span-2  p-4 text-center w-full">
                            <div className="">
                                <label className="font-bold text-left text-sm text-black justify-items-start">
                                   SYSTEM MESSAGE:
                                </label>
                            </div>
                </div>
                
                <div className="col-span-2 bg-red-300 p-4 text-center w-full">
                    <div className="grid grid-cols-2 grid-flow-col ">
            
                    {/* input */}
                    <div className="p-4  grid grid-flow-row  cols-span-2 justify-items-start gap-1">
                            <div className="">
                                <label className="font-bold text-left text-sm text-black ">
                                    Number of Patients work-up submission:
                                </label>
                            </div>
                            <div className="">
                                <label className="font-bold text-left text-sm text-black ">
                                Number of Patients pending work-up submission:
                                </label>
                            </div>
                            
                    </div>
                </div>
            </div>
        </div>


        </div>
   
                    
              
            
                

        </div>
        </div>
        
    </div>
  );
};

export default NotificationPage;
