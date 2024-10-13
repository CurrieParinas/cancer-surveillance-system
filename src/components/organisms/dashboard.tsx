"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { PatientsResponseSchema } from "@/packages/api/patient-list";
import { z } from "zod";

interface User {
  userId: string;
  [key: string]: any;
}

type PatientsResponse = z.infer<typeof PatientsResponseSchema>;

export const Dashboard = () => {
  const [patients, setPatients] = useState<PatientsResponse>([]);
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState({ doctorId: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);

      // Ensure the structure matches your API response
      setDoctorInfo({
        doctorId: parsedUserData.doctorId
      });
    }
  }, []);

  const user: User | null = (() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      console.log(storedUser);
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  })();

  useEffect(() => {
    if (user) {
      fetchPatients(doctorInfo.doctorId);
    }
  }, [user]);

  const fetchPatients = async (doctorId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/css/onboard/getPatientsByDoctor/${doctorId}`
      );
      if (response.ok) {
        const data = await response.json();
        try {
          const validData = PatientsResponseSchema.parse(data);
          setPatients(validData);
          setLoading(false);
        } catch (validationError) {
          console.error("Validation error:", validationError);
          setLoading(false);
        }
      } else {
        console.error("Failed to fetch patients");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-16 text-black flex justify-center">
        <Label className="text-center text-6xl text-red-900">Cancer Surveillance System</Label>
      </div>

      <div className="px-16 w-4/6 flex gap-12">
        <div className="w-1/2 p-2 rounded-lg bg-red-50 min-h-96">
          <div className="border-y border-black h-full">
            <Table className="w-full h-full" divClassName={`${patients.length > 0 ? '' : 'h-full'}`}>
              <TableHeader>
                <TableRow className="border-black w-full">
                  <TableHead className="text-center text-black font-bold text-lg w-1/2">Patient List</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-full">
                {loading ? (
                  <TableRow>
                    <TableCell className="text-center text-black">Loading...</TableCell>
                  </TableRow>
                ) : patients.length > 0 ? (
                  patients.map((relation) => (
                    <TableRow key={relation.patient.patientId} className="h-6 border-none hover:bg-red-300">
                      <TableCell className="text-center text-black">
                        {relation.patient.user.userFirstname} {relation.patient.user.userLastname}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="flex items-center justify-center w-full h-full">
                    <TableCell className="text-center text-black">No patients found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

          </div>
        </div>
        <div className="w-1/2">
          <Calendar
            className="h-full w-full flex text-black bg-red-50 rounded-xl"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2",
              head_cell: "rounded-none",
              day_today: "bg-red-200",
            }}
          />
        </div>
      </div>

      <div className="p-8 w-4/6 flex flex-col px-16">
        <Label className="text-black py-4 font-extrabold text-xl">Submitted Workup</Label>
        <Table className="w-full border-y border-black">
          <TableHeader>
            <TableRow className="border-black w-full">
              <TableHead className="text-center text-black font-bold text-lg">Name</TableHead>
              <TableHead className="text-center text-black font-bold text-lg">Diagnosis</TableHead>
              <TableHead className="text-center text-black font-bold text-lg">Submission Date</TableHead>
              <TableHead className="text-center text-black font-bold text-lg">Laboratory</TableHead>
              <TableHead className="text-center text-black font-bold text-lg">Last Encounter Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-6 border-none hover:bg-red-300">
              <TableCell className="text-center text-black">Patient Name</TableCell>
              <TableCell className="text-center text-black">Diagnosis Info</TableCell>
              <TableCell className="text-center text-black">Submission Date Info</TableCell>
              <TableCell className="text-center text-black">Laboratory Info</TableCell>
              <TableCell className="text-center text-black">Last Encounter Date Info</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
