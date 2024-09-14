"use client"

import { Label } from "../ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import React from "react"


export const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-16 text-black flex justify-center">
        <Label className="text-center text-6xl text-red-900">Cancer Surveillance System</Label>
      </div>

      <div className="px-16 w-4/6 flex gap-12">
        <div className="w-1/2 p-2 rounded-lg bg-red-100">
          <Table className='w-full border-y border-black'>
            <TableHeader>
              <TableRow className='border-black w-full'>
                <TableHead className='text-center text-black font-bold text-lg w-1/2'>Patient List</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
              <TableRow className='h-6 border-none hover:bg-red-300'>
                <TableCell className='text-center text-black'>Patient Name</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="w-1/2">
          <Calendar
            className="h-full w-full flex text-black bg-red-100 rounded-xl"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2",
              head_cell: "rounded-none",
            }}
          />
        </div>
      </div>

      <div className="p-8 w-4/6 flex flex-col px-16">
        <Label className="text-black py-4 font-extrabold text-xl">Submitted Workup</Label>
        <Table className='w-full border-y border-black'>
          <TableHeader>
            <TableRow className='border-black w-full'>
              <TableHead className='text-center text-black font-bold text-lg'>Name</TableHead>
              <TableHead className='text-center text-black font-bold text-lg'>Diagnosis</TableHead>
              <TableHead className='text-center text-black font-bold text-lg'>Submission Date</TableHead>
              <TableHead className='text-center text-black font-bold text-lg'>Laboratory</TableHead>
              <TableHead className='text-center text-black font-bold text-lg'>Last Encounter Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='h-6 border-none hover:bg-red-300'>
              <TableCell className='text-center text-black'>Patient Name</TableCell>
              <TableCell className='text-center text-black'>Diagnosis Info</TableCell>
              <TableCell className='text-center text-black'>Submission Date Info</TableCell>
              <TableCell className='text-center text-black'>Laboratory Info</TableCell>
              <TableCell className='text-center text-black'>Last Encounter Date Info</TableCell>
            </TableRow>
            <TableRow className='h-6 border-none hover:bg-red-300'>
              <TableCell className='text-center text-black'>Patient Name</TableCell>
              <TableCell className='text-center text-black'>Diagnosis Info</TableCell>
              <TableCell className='text-center text-black'>Submission Date Info</TableCell>
              <TableCell className='text-center text-black'>Laboratory Info</TableCell>
              <TableCell className='text-center text-black'>Last Encounter Date Info</TableCell>
            </TableRow>
            <TableRow className='h-6 border-none hover:bg-red-300'>
              <TableCell className='text-center text-black'>Patient Name</TableCell>
              <TableCell className='text-center text-black'>Diagnosis Info</TableCell>
              <TableCell className='text-center text-black'>Submission Date Info</TableCell>
              <TableCell className='text-center text-black'>Laboratory Info</TableCell>
              <TableCell className='text-center text-black'>Last Encounter Date Info</TableCell>
            </TableRow>
            <TableRow className='h-6 border-none hover:bg-red-300'>
              <TableCell className='text-center text-black'>Patient Name</TableCell>
              <TableCell className='text-center text-black'>Diagnosis Info</TableCell>
              <TableCell className='text-center text-black'>Submission Date Info</TableCell>
              <TableCell className='text-center text-black'>Laboratory Info</TableCell>
              <TableCell className='text-center text-black'>Last Encounter Date Info</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>

  )
}
