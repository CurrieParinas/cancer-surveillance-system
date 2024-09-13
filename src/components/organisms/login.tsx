"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import Image from 'next/image'
import Logo from '/public/logo/upm-colored.png'
import { Input } from '../ui/input'
// import Logo from '/public/logo/upm-seal-no-color.svg'

export const Login = () => {
  return (
    <div className='w-full flex h-full px-10'>
      <div className='flex flex-col w-1/2 justify-center items-center'>
        <div className='flex px-16 justify-center items-center gap-10 py-10'>
          <Image src={Logo} width={250} height={250} className='shrink-0 object-contain' alt='upm-logo' />
          <Label className='text-8xl text-black pb-4'>Cancer Surveillance System</Label>
        </div>
        <Label className='italic text-black font-bold py-20 text-3xl'>&quot;Magkasama natin puksain ang kanser&quot;</Label>
      </div>
      <div className='flex w-1/2 justify-center items-center'>
        <LoginForm />
      </div>
    </div>
  )
}

export const LoginForm = () => {
  return (
    <div className='h-4/6 w-3/6 bg-red-100 text-red-800 flex justify-center items-center border-4 border-red-200 flex-col'>
      <div className='flex flex-col items-center justify-center'>
        <Label className='text-5xl py-8'>LOGIN</Label>
        <form className='space-y-5 py-8'>
          <div className='flex gap-2 items-center'>
            <Label className='text-2xl '>Email:</Label>
            <Input type="email" className='text-xl h-6 shadow-none border-t-0 border-x-0 border-b border-zinc-400 rounded-none focus-visible:ring-0' />
          </div>
          <div className='flex gap-2 items-center'>
            <Label className='text-2xl '>Password:</Label>
            <Input type="password" className='text-xl h-6 shadow-none border-t-0 border-x-0 border-b border-zinc-400 rounded-none focus-visible:ring-0' />
          </div>
          <div className='w-full flex justify-center py-4'>
            <Button className='bg-red-700 hover:bg-red-900 rounded-none h-11 w-1/2 shadow-md text-xl'>SUBMIT</Button>
          </div>
        </form>

      </div>
      <div className='w-full flex justify-end pr-4'>
        <Button className='bg-transparent text-zinc-400 italic shadow-none hover:bg-transparent hover:text-black'>Forgot password?</Button>
      </div>
    </div>
  )
}

export const LoginNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className='h-1/6 w-full bg-red-900 flex justify-center items-center'>
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
    <div className='h-16 w-full bg-red-900 flex justify-center items-center'>
      <Label>Copyright (c) 2024. <b>UPM-HI Inc.</b> All Rights Reserved.</Label>
    </div>
  )
}