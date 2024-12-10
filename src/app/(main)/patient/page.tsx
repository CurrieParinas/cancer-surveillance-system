import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CircleCheckBig } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import bg from '../../../../public/background/4.jpg'
import bg2 from '../../../../public/background/patient.jpg'

const Patient = () => {
  return (
    <div className="w-full bg-white text-gray-900 p-16 flex flex-col space-y-16 pt-32">
      {/* Header Section */}
      <div className="relative w-full h-[400px] bg-zinc-900">
        {/* Background Image */}
        <Image
          src={bg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 z-0 opacity-70"
        />

        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-10 bg-black/40">
          <div className="py-8 flex flex-col gap-8">
            <Label className="charm text-8xl text-white tracking-wide">Bahagi ka ng iyong paggaling</Label>
            <Label className="text-xl font-bold text-zinc-300 block tracking-wide">Cancer Surveillance System</Label>
          </div>
        </div>
      </div>


      {/* Why Choose CSS Section */}
      <div className="flex flex-col md:flex-row md:space-x-16 bg-red-50 p-4">
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <Image src={bg2} className="object-cover" alt="UPM Logo" />
        </div>
        <div className="md:w-1/2 flex flex-col space-y-4 justify-center">
          <Label className="text-xl font-semibold text-gray-700">Why choose CSS?</Label>
          <Label className="text-5xl font-bold text-gray-900">We are patient-centered</Label>
          <Label className="text-lg font-light text-gray-600 leading-relaxed">
            Choose the Cancer Surveillance System (CSS) for a smarter, more supportive approach to your healthcare.
            Our system brings everything you need into one easy-to-use application, making it simple to stay on top of your
            treatment and connect with your healthcare team. Experience a streamlined, personalized care journey that puts you
            at the center of your health management.
          </Label>
        </div>
      </div>

      {/* What CSS Offers Section */}
      <div className="flex flex-col space-y-6">
        <Label className="text-xl font-semibold text-gray-700">What CSS offers?</Label>
        <Label className="text-5xl font-bold text-gray-900">Seamless cancer care experience</Label>
        <Label className="text-lg font-light text-gray-600">
          The CSS enables patients or their caregivers to:
        </Label>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-10">
        {[
          { title: "Be notified", description: "about follow-up treatments and laboratory workups via email and in-app alerts" },
          { title: "Submit", description: "laboratory workups related to the treatment plan" },
          { title: "Track", description: "treatment plan history and progress" },
          { title: "Interact", description: "with healthcare providers remotely" },
          { title: "Access", description: "support materials related to CSS and cancer care" },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4">
            <CircleCheckBig size={100} className="text-red-900" />
            <Label className="text-2xl font-semibold text-gray-900">{feature.title}</Label>
            <Label className="text-sm font-light text-gray-600">{feature.description}</Label>
          </div>
        ))}
      </div>

      {/* Closing Section */}
      <div className="text-center flex flex-col gap-4">
        <div className="flex justify-center space-x-1">
          <Label className='text-4xl'>Sa CSS,</Label>
          <Label className="text-red-900 font-bold text-4xl">katuwang</Label>
          <Label className='text-4xl'>mo ang iyong doktor</Label>
        </div>
        <div className="flex flex-col gap-4 justify-center space-x-6 pt-6">
          <Label className="text-lg font-light text-gray-600">Interested? Learn more.</Label>
          <div className="flex gap-4 justify-center">
            <Button className="bg-red-900 hover:bg-red-800 rounded-full px-6 py-3 text-lg text-white shadow-lg">
              How to use CSS
            </Button>
            <Button className="bg-red-900 hover:bg-red-800 rounded-full px-6 py-3 text-lg text-white shadow-lg">
              Why Patients Use CSS
            </Button></div>
        </div>
      </div>
    </div>
  );
};

export default Patient;