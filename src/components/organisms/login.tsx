"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import Image from 'next/image'
import Logo from '/public/logo/upm-colored.png'
import { Input } from '../ui/input'
import DoctorSchema from '@/packages/api/doctor'
import Link from 'next/link'
import { PatientSchema } from '@/packages/api/patient'
import { Contact2Icon, HeartPulseIcon, HouseIcon, InfoIcon, LucideBookA, MenuIcon, StethoscopeIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"

// import BackgroundImage from '../../../public/background/1_1.jpg'

export const Login = () => {
  return (
    <div className='w-full h-screen text-black flex justify-center items-center'>
      <div className='w-3/5 flex flex-col items-center'>
        <div className='w-full flex justify-center items-center px-32 gap-6'>
          <Image src={Logo} width={300} height={300} className='shrink-0 object-contain' alt='upm-logo' />
          <Label className='text-8xl px-2'>Cancer Surveillance System</Label>
        </div>
        <Label className='pt-20 text-5xl kalam-font'>&quot;Magkasama natin puksain ang kanser&quot;</Label>
      </div>
      <div className='w-2/5'>
        <LoginForm />
      </div>
    </div>
    // <div className="flex flex-col items-center justify-between h-screen overflow-hidden bg-zinc-200 sm:bg-zinc-600 w-full">
    //   <div className="absolute w-full h-full">
    //     <Image
    //       src={BackgroundImage}
    //       alt='background image'
    //       className='object-cover w-full h-full opacity-50 hidden sm:flex'
    //     />
    //   </div>
    //   <div className="z-10 w-full h-screen mt-10 flex justify-center items-center">
    //     <div className="flex w-full sm:w-6/12 h-[70%]">
    //       <div className='w-full h-full bg-zinc-200 flex justify-center items-center text-black rounded-none sm:rounded-3xl'>
    //         <div className="w-1/2 h-full hidden justify-center items-center xl:flex">
    //           <div className="h-[97.5%] rounded-l-2xl mx-2 flex flex-col justify-between py-6 px-3 items-center bg-red-900">
    //             <Label className='text-3xl text-white tracking-wider pt-4 font-semibold text-center'>Cancer Surveillance System</Label>
    //             <Image
    //               src={Logo}
    //               alt='background image'
    //               className='object-contain w-10/12 opacity-75'
    //             />
    //             <Label className='text-xl text-zinc-300 font-light italic text-center'>&quot;Magkasama natin puksain ang kanser&quot;</Label>
    //           </div>
    //         </div>
    //         <div className="xl:w-1/2 w-full">
    //           <LoginForm />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      EMAIL: email,
      PASSWORD: password,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();

        try {
          let parsedData;

          if ('patientId' in data) {
            parsedData = PatientSchema.parse(data);
          } else if ('doctorId' in data) {
            parsedData = DoctorSchema.parse(data);
          } else {
            throw new Error("Unknown user type in response");
          }

          localStorage.setItem('user', JSON.stringify(parsedData));

          if ('patientId' in data) {
            router.push("/reportSymptoms");
          } else if ('doctorId' in data) {
            router.push("/dashboard");
          } else {
            throw new Error("Unknown user type in response");
          }

          // Reload the page after navigation
          setTimeout(() => {
            window.location.reload();
          }, 1000); // Adjust the timeout if needed
        } catch (validationError) {
          console.error('Validation failed:', validationError);
        }
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        className="p-8 max-w-md w-full rounded-lg
      
      ">
        <h2 className="text-4xl text-center py-4 text-red-800">Kumusta!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="block text-lg font-medium text-red-800" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-lg p-2 border border-gray-300 rounded-lg focus:ring-red-800 focus:border-red-800"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="block text-lg font-medium text-red-800" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-lg p-2 border border-gray-300 rounded-lg focus:ring-red-800 focus:border-red-800"
              required
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              className="w-full bg-red-900 text-white text-lg py-2 rounded-lg hover:bg-red-800 transition-shadow shadow-sm"
            >
              Submit
            </Button>
            <a href="/forgotPassword" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
        <div className="my-6 border-t border-gray-300"></div>
        <div className="flex justify-center gap-1 text-sm">
          <span className="text-gray-600">Not yet registered?</span>
          <Link href="/doctorRegistration" className="text-red-700 hover:underline">
            Sign Up!
          </Link>
        </div>
      </div>
    </div>

  );
};

import logo from '../../../public/logo/logo2.svg'

export const LoginNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className='absolute top-0 w-full h-20 bg-red-900 transition-all duration-300 flex justify-between items-center  px-8 md:px-2'>
      <div className='group text-black h-12 sm:w-[355px] flex items-center hover:bg-zinc-200 justify-center rounded-md transition-all duration-300 ease-in-out cursor-pointer'
        onClick={() => router.push('/')}
      >
        <Image
          src={logo}
          alt='LOGO'
          className='h-full object-contain'
          height={60}
          width={60}
        />
        <Label className='text-xl text-white tracking-wider group-hover:text-black cursor-pointer sm:flex hidden'>
          Cancer Surveillance System
        </Label>
        <Label className='text-xl text-white tracking-wider group-hover:text-black cursor-pointer sm:hidden flex'>
          CSS
        </Label>
      </div>
      <div className='hidden lg:flex gap-2'>
        <Button
          onClick={() => router.push("/")}
          className={`w-14 xl:w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/") ? 'bg-white text-black' : ''}`}
        >
          <HouseIcon /> <p className="hidden xl:flex">Home</p>
        </Button>
        <Button
          onClick={() => router.push("/patient")}
          className={`w-14 xl:w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/patient") ? 'bg-white text-black' : ''}`}
        >
          <HeartPulseIcon /> <p className="hidden xl:flex">Patient</p>
        </Button>
        <Button
          onClick={() => router.push("/doctor")}
          className={`w-14 xl:w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/doctor") ? 'bg-white text-black' : ''}`}
        >
          <StethoscopeIcon /> <p className="hidden xl:flex">Doctor</p>
        </Button>
        <Button
          onClick={() => router.push("/tutorial")}
          className={`w-14 xl:w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/tutorial") ? 'bg-white text-black' : ''}`}
        >
          <LucideBookA /> <p className="hidden xl:flex">Tutorial</p>
        </Button>
        <Button
          onClick={() => router.push("/contact")}
          className={`w-14 xl:w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/contact") ? 'bg-white text-black' : ''}`}
        >
          <Contact2Icon /> <p className="hidden xl:flex">Contact</p>
        </Button>
        <Button
          onClick={() => router.push("/about")}
          className={`w-14 xl:w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/about") ? 'bg-white text-black' : ''}`}
        >
          <InfoIcon /> <p className="hidden xl:flex">About</p>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger className='flex lg:hidden'> <MenuIcon /></SheetTrigger>
        <SheetContent className='bg-red-900 w-1/4 border-l-0 px-2 pt-10'>
          <SheetDescription className='gap-2'>
            <Button
              onClick={() => router.push("/")}
              className={`w-full flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black justify-start ${isActive("/about") ? 'bg-white text-black' : ''}`}
            >
              <HouseIcon /> <p className="">Home</p>
            </Button>
            <Button
              onClick={() => router.push("/patient")}
              className={`w-full flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black justify-start ${isActive("/patient") ? 'bg-white text-black' : ''}`}
            >
              <HeartPulseIcon /> <p className="">Patient</p>
            </Button>
            <Button
              onClick={() => router.push("/doctor")}
              className={`w-full flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black justify-start ${isActive("/doctor") ? 'bg-white text-black' : ''}`}
            >
              <StethoscopeIcon /> <p className="">Doctor</p>
            </Button>
            <Button
              onClick={() => router.push("/tutorial")}
              className={`w-full flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black justify-start ${isActive("/tutorial") ? 'bg-white text-black' : ''}`}
            >
              <LucideBookA /> <p className="">Tutorial</p>
            </Button>
            <Button
              onClick={() => router.push("/contact")}
              className={`w-full flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black justify-start ${isActive("/contact") ? 'bg-white text-black' : ''}`}
            >
              <Contact2Icon /> <p className="">Contact</p>
            </Button>
            <Button
              onClick={() => router.push("/about")}
              className={`w-full flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black justify-start ${isActive("/about") ? 'bg-white text-black' : ''}`}
            >
              <InfoIcon /> <p className="">About</p>
            </Button>
          </SheetDescription>
        </SheetContent>
      </Sheet>

    </div>
  )
}

export const LoginFooter = () => {
  const pathname = usePathname();

  if (pathname === '/patient' || pathname === '/doctor' || pathname === '/tutorial' || pathname === '/contact' || pathname === '/about') {
    return null;
  }

  return (
    <div className='absolute bottom-0 w-full h-6 bg-red-900 flex justify-center items-center'>
      <Label>Copyright (c) 2024. <b>UPM-HI Inc.</b> All Rights Reserved.</Label>
    </div>
  );
};