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
    return (
        <div className="w-5/6 bg-white flex flex-col items-center px-6 h-screen">
            <div className="w-6/12 h-auto mt-12 p-2 text-center">
                <p className="font-bold text-6xl text-red-900 text-nowrap	tracking-wide">ALERT</p>
            </div>

            {/* Table Section */}
            <div className="w-full max-w-4xl h-3/6 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
                <Table className="">
                    <TableHeader>
                        <TableRow className="bg-red-100 hover:bg-red-100">
                            <TableHead className="font-medium text-sm text-gray-700 py-3 w-1/5">
                                Date
                            </TableHead>
                            <TableHead className="font-medium text-sm text-gray-700 py-3 w-1/5">
                                Sender
                            </TableHead>
                            <TableHead className="font-medium text-sm text-gray-700 py-3 w-3/5 text-center">
                                Message
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Array(12).fill(null).map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="text-sm text-gray-700 bg-white py-2">
                                    PLACEHOLDER
                                </TableCell>
                                <TableCell className="text-sm text-gray-700 bg-white py-2">
                                    PLACEHOLDER
                                </TableCell>
                                <TableCell className="text-sm text-gray-700 bg-white py-2">
                                    PLACEHOLDER
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* System Message Section */}
            <div className="w-full max-w-4xl mt-8 bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <p className="font-semibold text-lg text-gray-800">
                        SYSTEM MESSAGE:
                    </p>
                </div>
                <div className="bg-red-100 p-4 rounded-md">
                    <div className="space-y-4">
                        <p className="font-medium text-sm text-gray-800">
                            Number of Patients work-up submission:
                        </p>
                        <p className="font-medium text-sm text-gray-800">
                            Number of Patients pending work-up submission:
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NotificationPage;
