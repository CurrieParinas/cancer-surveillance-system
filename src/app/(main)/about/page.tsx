"use client"

import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Import team images
import guillermo from '/public/team/guillermo.png';
import panes from '/public/team/panes.png';
import sheila from '/public/team/sheila.png';
import currie from '/public/team/currie.png';
import ron from '/public/team/ron.png';
import nathan from '/public/team/nathan.png';
import demi from '/public/team/demi.png';
import bg from '../../../../public/background/2.jpg'

const About = () => {
  const router = useRouter();

  return (
    <div className="w-full text-gray-900 p-16 flex flex-col space-y-16 pt-32 bg-white">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <Label className="text-6xl font-bold">About Cancer Surveillance System</Label>
      </div>

      {/* Why It Started Section */}
      <div className="flex md:space-x-16 bg-red-50 p-4 h-[500px]">
        <div className="w-1/2 flex justify-center md:justify-start">
          <Image src={bg} className="object-cover" alt="Doctor Image" />
        </div>
        <div className="w-1/2 flex flex-col space-y-6 justify-center">
          <Label className="text-xl font-semibold">Why It Started?</Label>
          <Label className="text-4xl font-bold">For System Analysis and Design for Health</Label>
          <Label className="text-lg leading-relaxed text-gray-600">
            MS in Health Informatics students formulated the Cancer Surveillance System (CSS) as a major requirement for the course HI 210 (System Analysis and Design for Health), and developed this system with undergraduate Computer Science students of the University of the Philippines Manila.  Prior to CSS, there was a lack of an integrated information system capable of
            comprehensively monitoring and supporting treatment progress and completion, and supports cancer research
          </Label>
        </div>
      </div>

      {/* Objectives Section */}
      <div className="flex flex-col space-y-8">
        <Label className="text-xl font-semibold">Objectives</Label>
        <Label className="text-4xl font-bold">To Transform Cancer Care</Label>
        <Label className="text-lg leading-relaxed text-gray-600">
          The Cancer Surveillance System (CSS) is designed to optimize cancer care through comprehensive
          tracking and reporting. It enables precise monitoring of patient progress, post-treatment symptoms,
          and laboratory results while facilitating easy communication between patients and doctors. The system
          streamlines laboratory request management, automates reminders and notifications, and supports
          patient engagement through curated educational materials and online support. With enhanced security,
          multilingual options, and integrated research databases, CSS ensures a seamless, efficient, and secure
          healthcare experience for both patients and healthcare providers.        </Label>
      </div>

      {/* Meet the Team Section */}
      <div className="flex flex-col space-y-4">
        <div className='flex flex-col space-y-4 pb-8'>
          <Label className="text-xl font-semibold">Meet the Team</Label>
          <Label className="text-4xl font-bold">The CSS Team</Label>
          <Label className="text-lg leading-relaxed text-gray-600">
            A collaboration between MS in Health Informatics and BS in Computer Science students from the University of the Philippines Manila.
          </Label>
        </div>

        <div className='flex flex-col justify-center items-center gap-16'>
          <div className='flex gap-20'>
            <div className='flex flex-col justify-center items-center gap-4'>
              <div className='rounded-full w-32 h-32 border overflow-hidden'>
                <Image src={guillermo} width={250} height={250} className='object-cover' alt='kat-guillermo' />
              </div>
              <Label className='text-xl font-semibold'>Dr. Ma. Katrina Guillermo</Label>
              <Label className='italic text-gray-600'>Project Leader, System Analyst</Label>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
              <div className='rounded-full w-32 h-32 border overflow-hidden'>
                <Image src={panes} width={250} height={250} className='object-cover' alt='alanna-panes' />
              </div>
              <Label className='text-xl font-semibold'>Alanna Marie Panes</Label>
              <Label className='italic text-gray-600'>System Analyst</Label>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='rounded-full w-32 h-32 border overflow-hidden'>
              <Image src={sheila} width={250} height={250} className='object-cover' alt='sheila-magboo' />
            </div>
            <Label className='text-xl font-semibold'>Dr. Sheila Magboo</Label>
            <Label className='italic text-gray-600'>Adviser</Label>
          </div>
          <div className='flex gap-20'>
            <div className='flex flex-col justify-center items-center gap-4'>
              <div className='rounded-full w-32 h-32 border overflow-hidden'>
                <Image src={currie} width={250} height={250} className='object-cover' alt='currie-parinas' />
              </div>
              <Label className='text-xl font-semibold'>Currie Exekiel Parinas</Label>
              <Label className='italic text-gray-600'>Front-end Developer</Label>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
              <div className='rounded-full w-32 h-32 border overflow-hidden'>
                <Image src={ron} width={250} height={250} className='object-cover' alt='ron-gomez' />
              </div>
              <Label className='text-xl font-semibold'>Ron Brylle Gomez</Label>
              <Label className='italic text-gray-600'>Back-end Developer</Label>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
              <div className='rounded-full w-32 h-32 border overflow-hidden'>
                <Image src={nathan} width={250} height={250} className='object-cover' alt='nathan-callang' />
              </div>
              <Label className='text-xl font-semibold'>Nathan Gerard Callang</Label>
              <Label className='italic text-gray-600'>Back-end Developer</Label>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
              <div className='rounded-full w-32 h-32 border overflow-hidden'>
                <Image src={demi} width={250} height={250} className='object-cover' alt='demi-ercia' />
              </div>
              <Label className='text-xl font-semibold'>Demi Gail Ashley Ercia</Label>
              <Label className='italic text-gray-600'>Front-end Developer</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center space-y-4">
        <Label className="text-xl font-light text-gray-600">Interested? Learn more.</Label>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => router.push('/tutorial')} className="bg-red-700 hover:bg-red-900 text-white px-6 py-3 rounded-full shadow-lg">How to use CSS</Button>
          <Button onClick={() => router.push('/patient')} className="bg-red-700 hover:bg-red-900 text-white px-6 py-3 rounded-full shadow-lg">Why Patients Use CSS</Button>
          <Button onClick={() => router.push('/doctor')} className="bg-red-700 hover:bg-red-900 text-white px-6 py-3 rounded-full shadow-lg">Why Doctors Use CSS</Button>
        </div>
      </div>
    </div>
  );
};

export default About;