"use client"

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

const Patient = () => {
  const router = useRouter();

  return (
    <div className='w-full text-black flex flex-col items-center bg-gray-100 min-h-screen pt-32 pb-20'>
      {/* Header Section */}
      <div className='text-center mb-12'>
        <Label className='text-6xl font-semibold text-black'>Contact Us</Label>
      </div>

      {/* Contact Table Section */}
      <div className='w-full flex justify-center overflow-x-auto max-w-7xl'>
        <Table className='w-full'>
          <TableHeader className='bg-gray-200'>
            <TableRow>
              <TableHead className='text-center text-gray-800 font-semibold text-lg'>Email</TableHead>
              <TableHead className='text-center text-gray-800 font-semibold text-lg'>Contact Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='hover:bg-gray-100'>
              <TableCell className='text-center text-gray-600'>mbguillermo2@up.edu.ph</TableCell>
              <TableCell className='text-center text-gray-600'>0949 998 8305</TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
              <TableCell className='text-center text-gray-600'>agpanes@up.edu.ph</TableCell>
              <TableCell className='text-center text-gray-600'>0951 954 7948</TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
              <TableCell className='text-center text-gray-600'>cbparinas@up.edu.ph</TableCell>
              <TableCell className='text-center text-gray-600'>0917 723 0121</TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
              <TableCell className='text-center text-gray-600'>nbcallang@up.edu.ph</TableCell>
              <TableCell className='text-center text-gray-600'>0908 777 5482</TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
              <TableCell className='text-center text-gray-600'>rsgomez1@up.edu.ph</TableCell>
              <TableCell className='text-center text-gray-600'>0927 044 2113</TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
              <TableCell className='text-center text-gray-600'>deercia@up.edu.ph</TableCell>
              <TableCell className='text-center text-gray-600'>0998 957 2078</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Address Section */}
      <div className='py-10 text-center'>
        <Label className='text-2xl font-bold text-gray-800'>Address</Label>
        <p className='text-xl text-gray-600 mt-4'>
          University of the Philippines Manila, Padre Faura St, Ermita, Manila, 1000 Metro Manila
        </p>
      </div>

      {/* Call to Action Section */}
      <div className='py-4 text-center kalam-font'>
        <div className='flex flex-col gap-5 items-center'>
          <div className='flex gap-5'>
            <Label className='text-red-600 text-5xl font-bold'>Magkasama</Label>
            <Label className='text-gray-800 text-5xl font-bold'>natin</Label>
          </div>
          <Label className='text-gray-800 text-5xl font-bold'>puksain ang kanser</Label>
        </div>
      </div>

      {/* Footer Section */}
      <div className='text-center mt-12'>
        <Label className='text-lg font-medium text-gray-800'>Interested? Learn more.</Label>
        <div className='flex justify-center gap-6 mt-6'>
          <Button
            onClick={() => router.push("/tutorial")}
            className='bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-3 text-lg'>
            How to use CSS
          </Button>
          <Button
            onClick={() => router.push("/patient")}
            className='bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-3 text-lg'>
            Why Patients Use CSS
          </Button>
          <Button
            onClick={() => router.push("/doctor")}
            className='bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-3 text-lg'>
            Why Doctors Use CSS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Patient;