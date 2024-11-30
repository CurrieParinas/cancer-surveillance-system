"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import Image from 'next/image'
import Logo from '/public/logo/upm-colored.png'
import { Input } from '../ui/input'
// import Logo from '/public/logo/upm-seal-no-color.svg'
import DoctorSchema from '@/packages/api/doctor'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { PatientSchema } from '@/packages/api/patient'

export const Login = () => {
  return (
    <div className='w-full text-black h-screen-minus-48 flex py-28'>
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
        console.log(data);

        try {
          let parsedData;

          if ('patientId' in data) {
            parsedData = PatientSchema.parse(data);
          } else if ('doctorId' in data) {
            parsedData = DoctorSchema.parse(data);
          } else {
            throw new Error("Unknown user type in response");
          }

          console.log('Login successful and data is valid:', parsedData);

          localStorage.setItem('user', JSON.stringify(parsedData));
          window.location.reload();
          router.push("/dashboard");
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
    <div className="flex items-center justify-center">
      <div className="bg-red-50 p-10 shadow-md max-w-sm w-full border-4 border-red-200">
        <h2 className="text-4xl font-bold text-center py-4 text-red-800">LOGIN</h2>
        <form onSubmit={handleSubmit} className='space-y-8 py-6'>
          <div className="flex items-center gap-2">
            <Label className="block text-xl font-medium text-red-800" htmlFor="email">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xl h-6   shadow-none border-t-0 border-x-0 border-b border-zinc-400 rounded-none focus-visible:ring-0"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="block text-xl font-medium text-red-800" htmlFor="password">
              Password:
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-xl h-6 shadow-none border-t-0 border-x-0 border-b border-zinc-400 rounded-none focus-visible:ring-0"
              required
            />
          </div>
          <div className="flex justify-center items-center flex-col gap-4">
            <Button
              type="submit"
              className="bg-red-700 hover:bg-red-900 rounded-none h-11 w-1/2 shadow-md text-xl"
            >
              SUBMIT
            </Button>
            <div className="text-center">
              <a href="/forgotPassword" className="text-sm text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </form>
        <Separator />
        <div className="flex gap-2 justify-center pt-6">
          <Label className='font-normal text-base'>Not yet registered?</Label>
          <Link href="/doctorRegistration" className='text-red-900 hover:underline'>Sign Up!</Link>
        </div>
      </div>
    </div>
  );
};

export const LoginNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className='w-full h-28 bg-red-900 flex justify-center items-center'>
      <Button
        onClick={() => router.push("/")}
        className={`w-44 bg-transparent shadow-none text-xl py-6 hover:bg-transparent hover:underline underline-offset-4 ${isActive("/") ? 'underline' : ''}`}
      >
        Home
      </Button>
      <Button
        onClick={() => router.push("/patient")}
        className={`w-44 bg-transparent shadow-none text-xl py-6 hover:bg-transparent hover:underline underline-offset-4 ${isActive("/patient") ? 'underline' : ''}`}
      >
        Patient
      </Button>
      <Button
        onClick={() => router.push("/doctor")}
        className={`w-44 bg-transparent shadow-none text-xl py-6 hover:bg-transparent hover:underline underline-offset-4 ${isActive("/doctor") ? 'underline' : ''}`}
      >
        Doctor
      </Button>
      <Button
        onClick={() => router.push("/tutorial")}
        className={`w-44 bg-transparent shadow-none text-xl py-6 hover:bg-transparent hover:underline underline-offset-4 ${isActive("/tutorial") ? 'underline' : ''}`}
      >
        Tutorial
      </Button>
      <Button
        onClick={() => router.push("/contact")}
        className={`w-44 bg-transparent shadow-none text-xl py-6 hover:bg-transparent hover:underline underline-offset-4 ${isActive("/contact") ? 'underline' : ''}`}
      >
        Contact
      </Button>
      <Button
        onClick={() => router.push("/about")}
        className={`w-44 bg-transparent shadow-none text-xl py-6 hover:bg-transparent hover:underline underline-offset-4 ${isActive("/about") ? 'underline' : ''}`}
      >
        About
      </Button>
    </div>
  )
}

export const LoginFooter = () => {
  return (
    <div className='w-full h-20 bg-red-900 flex justify-center items-center'>
      <Label>Copyright (c) 2024. <b>UPM-HI Inc.</b> All Rights Reserved.</Label>
    </div>
  )
}