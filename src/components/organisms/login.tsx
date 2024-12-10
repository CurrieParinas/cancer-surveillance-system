"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import Image from 'next/image'
import Logo from '/public/logo/upm-colored.png'
import { Input } from '../ui/input'
import DoctorSchema from '@/packages/api/doctor'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { PatientSchema } from '@/packages/api/patient'
import { Contact2Icon, HeartPulseIcon, HouseIcon, InfoIcon, LucideBookA, StethoscopeIcon } from 'lucide-react'
import BackgroundImage from '../../../public/background/1_1.jpg'

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
    // <div className="flex flex-col items-center justify-between h-screen overflow-hidden bg-zinc-600 w-full">
    //   <div className="absolute w-full h-full">
    //     <Image
    //       src={BackgroundImage}
    //       alt='background image'
    //       className='object-cover w-full h-full opacity-50'
    //     />
    //   </div>
    //   <div className="z-10 w-full h-screen mt-10 flex justify-center items-center">
    //     <div className="flex w-6/12 h-[70%]">
    //       <div className='w-full h-full bg-zinc-200 flex justify-center items-center text-black  rounded-3xl'>
    //         <div className="w-1/2 h-full flex justify-center items-center">
    //           <div className="h-[97.5%] rounded-l-2xl mx-2 flex flex-col justify-between py-6 px-3 items-center bg-red-900">
    //             <Label className='text-3xl text-white tracking-wider pt-4 font-semibold text-center'>Cancer Surveillance System</Label>
    //             <Image
    //               src={Logo}
    //               alt='background image'
    //               className='object-contain w-10/12 opacity-75'
    //             />
    //             <Label className='text-xl text-zinc-300 font-light italic'>&quot;Magkasama natin puksain ang kanser&quot;</Label>
    //           </div>
    //         </div>
    //         <div className="w-1/2">
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
      const response = await fetch('http://localhost:8080/css/login', {
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
      border shadow-lg border-red-50
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
    <div className='absolute top-0 w-full h-20 bg-red-900 transition-all duration-300 flex justify-between items-center px-8'>
      <div className='group text-black h-12 w-[355px] flex items-center hover:bg-zinc-200 justify-center rounded-md transition-all duration-300 ease-in-out cursor-pointer'
        onClick={() => router.push('/')}
      >
        <Image
          src={logo}
          alt='LOGO'
          className='h-full object-contain'
          height={60}
          width={60}
        />
        <Label className='text-xl text-white tracking-wider group-hover:text-black cursor-pointer'>
          Cancer Surveillance System
        </Label>
      </div>
      <div className='flex gap-2'>
        <Button
          onClick={() => router.push("/")}
          className={`w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/") ? 'bg-white text-black' : ''}`}
        >
          <HouseIcon /> Home
        </Button>
        <Button
          onClick={() => router.push("/patient")}
          className={`w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/patient") ? 'bg-white text-black' : ''}`}
        >
          <HeartPulseIcon /> Patient
        </Button>
        <Button
          onClick={() => router.push("/doctor")}
          className={`w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/doctor") ? 'bg-white text-black' : ''}`}
        >
          <StethoscopeIcon /> Doctor
        </Button>
        <Button
          onClick={() => router.push("/tutorial")}
          className={`w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/tutorial") ? 'bg-white text-black' : ''}`}
        >
          <LucideBookA /> Tutorial
        </Button>
        <Button
          onClick={() => router.push("/contact")}
          className={`w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/contact") ? 'bg-white text-black' : ''}`}
        >
          <Contact2Icon /> Contact
        </Button>
        <Button
          onClick={() => router.push("/about")}
          className={`w-32 flex gap-1 text-white bg-transparent shadow-none text-lg py-6 hover:bg-zinc-200 hover:text-black ${isActive("/about") ? 'bg-white text-black' : ''}`}
        >
          <InfoIcon /> About
        </Button>
      </div>
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