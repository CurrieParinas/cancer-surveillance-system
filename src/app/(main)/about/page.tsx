"use client"

import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'
import guillermo from '/public/team/guillermo.png'
import panes from '/public/team/panes.png'
import sheila from '/public/team/sheila.png'
import currie from '/public/team/currie.png'
import ron from '/public/team/ron.png'
import nathan from '/public/team/nathan.png'
import demi from '/public/team/demi.png'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const About = () => {
  const router = useRouter();

  return (
    <div className='w-full text-black p-16 flex flex-col '>
      <Label className='text-xl'>Cancer Surveillance System</Label>
      <div className='text-black py-12'>
        <Label className='text-9xl'>About</Label>
        <Label className='text-9xl text-red-500'> Cancer Surveillance System</Label>
      </div>

      <div className='flex flex-col py-20'>
        <Label className='text-xl'>Why it started?</Label>
        <Label className='text-6xl py-8 font-normal'>In the PGH</Label>
        <Label className='text-2xl font-normal'>
          The Cancer Surveillance System (CSS) was developed to address critical gaps in cancer patient
          management at PGH. Prior to CSS, there was a lack of an integrated information system capable of
          comprehensively monitoring and supporting post-treatment progress, tracking treatment completion,
          and assessing disease status after treatment. The manual record-keeping practices led to frequent loss
          of patient records, especially for those undergoing treatment for over five years, and hindered the
          establishment of a robust cancer research database for the hospital. CSS was started to address these
          issues with a unified platform that improves patient monitoring, simplifies record-keeping, and supports
          cancer research.
        </Label>
        <Image src={""} width={250} height={50} className='w-full py-16' alt='upm-logo' />
      </div>

      <div className='flex flex-col py-20'>
        <Label className='text-xl'>Objectives</Label>
        <Label className='text-6xl py-8 font-normal'>To transform cancer care</Label>
        <Label className='text-2xl font-normal'>
          The Cancer Surveillance System (CSS) is designed to optimize cancer care through comprehensive
          tracking and reporting. It enables precise monitoring of patient progress, post-treatment symptoms,
          and laboratory results while facilitating easy communication between patients and doctors. The system
          streamlines laboratory request management, automates reminders and notifications, and supports
          patient engagement through curated educational materials and online support. With enhanced security,
          multilingual options, and integrated research databases, CSS ensures a seamless, efficient, and secure
          healthcare experience for both patients and healthcare providers.
        </Label>
      </div>

      <div className='flex flex-col py-20'>
        <Label className='text-xl'>Meet the Team</Label>
        <Label className='text-6xl py-8 font-normal'>The CSS Team</Label>
        <Label className='text-2xl font-normal'>
          This team was a collaboration between MS in Health Informatics and BS in Computer Science students
          from the Univeristy of the Philippines Manila.
        </Label>
      </div>

      <div className='flex flex-col justify-center items-center gap-16'>
        <div className='flex gap-20'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='rounded-full w-50 h-50 border overflow-hidden'>
              <Image src={guillermo} width={250} height={250} className='object-cover' alt='kat-guillermo' />
            </div>
            <Label className='text-2xl'>Dr. Ma. Katrina Guillermo</Label>
            <Label className='italic text-xl font-normal'>Role</Label>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='rounded-full w-50 h-50 border overflow-hidden'>
              <Image src={panes} width={250} height={250} className='object-cover' alt='alanna-panes' />
            </div>
            <Label className='text-2xl'>Alanna Marie Panes</Label>
            <Label className='italic text-xl font-normal'>Role</Label>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='rounded-full w-50 h-50 border overflow-hidden'>
            <Image src={sheila} width={250} height={250} className='object-cover' alt='sheila-magboo' />
          </div>
          <Label className='text-2xl'>Dr. Sheila Magboo</Label>
          <Label className='italic text-xl font-normal'>Role</Label>
        </div>
        <div className='flex gap-20'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='rounded-full w-50 h-50 border overflow-hidden'>
              <Image src={currie} width={250} height={250} className='object-cover' alt='currie-parinas' />
            </div>
            <Label className='text-2xl'>Currie Exekiel Parinas</Label>
            <Label className='italic text-xl font-normal'>Web Developer</Label>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='rounded-full w-50 h-50 border overflow-hidden'>
              <Image src={ron} width={250} height={250} className='object-cover' alt='ron-gomez' />
            </div>
            <Label className='text-2xl'>Ron Brylle Gomez</Label>
            <Label className='italic text-xl font-normal'>Web Developer</Label>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='rounded-full w-50 h-50 border overflow-hidden'>
              <Image src={nathan} width={250} height={250} className='object-cover' alt='nathan-callang' />
            </div>
            <Label className='text-2xl'>Nathan Gerard Callang</Label>
            <Label className='italic text-xl font-normal'>Web Developer</Label>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='rounded-full w-50 h-50 border overflow-hidden'>
              <Image src={demi} width={250} height={250} className='object-cover' alt='demi-ercia' />
            </div>
            <Label className='text-2xl'>Demi Gail Ashley Ercia</Label>
            <Label className='italic text-xl font-normal'>Web Developer</Label>
          </div>
        </div>
      </div>

      <Label className='text-xl font-normal pt-20'>Interested? Learn more.</Label>
      <div className='flex pt-10 gap-8'>
        <Button onClick={() => router.push("/tutorial")} className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>How to use CSS</Button>
        <Button onClick={() => router.push("/patient")} className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl' >Why Patients Use CSS</Button>
        <Button onClick={() => router.push("/doctor")} className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>Why Doctors Use CSS</Button>
      </div>

    </div>
  )
}

export default About