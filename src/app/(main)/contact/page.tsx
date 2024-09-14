"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation'


const Patient = () => {
  const router = useRouter();

  return (
    <div className='w-full text-black p-16 flex flex-col '>
      <Label className='text-xl'>Cancer Surveillance System</Label>
      <div className='py-14 w-full text-start'>
        <Label className='text-9xl'>Contact Us</Label>
      </div>

      <Table className='border-y border-black'>
        <TableHeader>
          <TableRow className='border-black w-full'>
            <TableHead className='text-center text-black font-bold text-lg w-1/2'>Email</TableHead>
            <TableHead className='text-center text-black font-bold text-lg w-1/2'>Contact Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
          <TableRow className='h-12 border-none hover:bg-zinc-200'>
            <TableCell className='text-center'>Email@email.text</TableCell>
            <TableCell className='text-center'>0912 345 6789</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className='py-16 flex flex-col'>
        <Label className='text-2xl font-bold'>Address</Label>
        <Label className='text-xl font-normal py-8'>Philippine General Hospital, Taft Avenue Ermita, Brgy 670 Zone 72, Manila, 1000 Metro Manila</Label>
      </div>

      <div className='w-full flex flex-col gap-5 pb-32 pt-20 kalam-font justify-center items-center'>
        <div className='flex gap-10'>
          <Label className='text-red-500 text-9xl'>Magkasama</Label>
          <Label className='text-9xl'>natin </Label>
        </div>
        <Label className='text-9xl'>puksain ang kanser</Label>
      </div>


      <Label className='text-xl font-normal'>Interested? Learn more.</Label>
      <div className='flex pt-10 gap-8'>
        <Button onClick={() => router.push("/tutorial")} className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>How to use CSS</Button>
        <Button onClick={() => router.push("/patient")} className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl' >Why Patients Use CSS</Button>
        <Button onClick={() => router.push("/doctor")} className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>Why Doctors Use CSS</Button>
      </div>
    </div>
  )
}

export default Patient