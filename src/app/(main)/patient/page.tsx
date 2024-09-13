import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CircleCheckBig } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Patient = () => {
  return (
    <div className='w-full text-black p-16 flex flex-col '>
      <Label className='text-xl'>Cancer Surveillance System</Label>
      <div className='py-14 w-full text-center'>
        <Label className='kalam-font text-9xl text-red-500'>Bahagi </Label>
        <Label className='kalam-font text-9xl'>ka ng iyong paggaling</Label>
      </div>
      <div className='flex pt-20'>
        <div className='w-1/2'>
          <Image src={""} width={250} height={250} className='shrink-0 object-contain' alt='upm-logo' />
        </div>
        <div className='w-1/2 flex flex-col pb-20'>
          <Label className='text-xl font-normal'>Why choose CSS?</Label>
          <Label className='text-6xl py-8 font-normal'>We are patient-centered</Label>
          <Label className='text-2xl font-normal'>Choose the Cancer Surveillance System (CSS) for a smarter, more supportive approach to your healthcare. Our system brings everything you need into one easy-to-use application, making it simple to stay on top of your treatment and connect with your healthcare team. Experience a streamlined, personalized care journey that puts you at the center of your health management.</Label>
        </div>
      </div>
      <div className='flex flex-col py-16'>
        <Label className='text-xl font-normal'>What CSS offers?</Label>
        <Label className='text-6xl py-8 font-normal'>Seamless cancer care experience</Label>
        <Label className='text-xl font-normal'>The CSS enables patients or their caregivers to:</Label>
      </div>
      <div className='flex flex-row justify-center items-center w-full px-20'>
        {/* Be Notified */}
        <div className='w-1/5 px-8 text-center flex flex-col gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Be notified</Label>
          <Label className='text-xl font-normal'>about follow-up treatments and laboratory workups via email and in-app alerts</Label>
        </div>

        {/* Submit */}
        <div className='w-1/5 px-8 text-center flex flex-col gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Submit</Label>
          <Label className='text-xl font-normal'>laboratory workups related to the treatment plan</Label>
        </div>

        {/* Track */}
        <div className='w-1/5 px-8 flex flex-col text-center gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Track</Label>
          <Label className='text-xl font-normal'>treatment plan history and progress</Label>
        </div>

        {/* Interact */}
        <div className='w-1/5 px-8 flex flex-col justify-center gap-4 text-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Interact</Label>
          <Label className='text-xl font-normal'>with healthcare providers remotely</Label>
        </div>

        {/* Access */}
        <div className='w-1/5 px-8 flex flex-col justify-center gap-4 items-center text-center '>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Access</Label>
          <Label className='text-xl font-normal'>support materials related to CSS and cancer care</Label>
        </div>
      </div>

      <div className='w-full flex gap-5 py-20 justify-center'>
        <Label className='text-6xl'>Sa CSS, </Label>
        <Label className='text-red-500 text-6xl'>katuwang </Label>
        <Label className='text-6xl'>mo ang iyong doktor</Label>
      </div>

      <Label className='text-xl font-normal'>Interested? Learn more.</Label>
      <div className='flex pt-10'>
        <Button className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>How to use CSS</Button>
        <Button className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>How to use CSS</Button>
      </div>
    </div>
  )
}

export default Patient