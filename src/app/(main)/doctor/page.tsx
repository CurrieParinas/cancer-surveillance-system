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
        <Label className='kalam-font text-9xl text-red-500'>Kasama </Label>
        <Label className='kalam-font text-9xl'>mo sa pangangalaga</Label>
      </div>
      <div className='flex pt-20'>
        <div className='w-1/2'>
          <Image src={""} width={250} height={250} className='shrink-0 object-contain' alt='upm-logo' />
        </div>
        <div className='w-1/2 flex flex-col pb-20'>
          <Label className='text-xl font-normal'>Why choose CSS?</Label>
          <Label className='text-6xl py-8 font-normal'>Efficiently manage patients</Label>
          <Label className='text-2xl font-normal'>
            Choose our system to elevate your practice with
            a comprehensive application that enhances
            patient care and streamlines your workflow.
            Benefit from persnalizing care, seamless remote
            interactions, and precise reporting to optimize
            treatment outcomes and support your clinical
            decisions effectively.
          </Label>
        </div>
      </div>
      <div className='flex flex-col py-16'>
        <Label className='text-xl font-normal'>What CSS offers?</Label>
        <Label className='text-6xl py-8 font-normal'>Streamlined, effective cancer care</Label>
        <Label className='text-xl font-normal'>The CSS enables healthcare providers to:</Label>
      </div>
      <div className='flex flex-row justify-center items-center w-full px-20'>
        {/* Monitor & Follow up */}
        <div className='w-1/5 px-8 text-center flex flex-col gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Monitor & Follow up</Label>
          <Label className='text-xl font-normal'>progress or status of patients</Label>
        </div>

        {/* Create */}
        <div className='w-1/5 px-8 text-center flex flex-col gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Create</Label>
          <Label className='text-xl font-normal'>individualized treatment plans for patients</Label>
        </div>

        {/* Interact */}
        <div className='w-1/5 px-8 text-center flex flex-col gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Interact</Label>
          <Label className='text-xl font-normal'>with patients remotely</Label>
        </div>

        {/* Produce */}
        <div className='w-1/5 px-8 text-center flex flex-col gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Produce</Label>
          <Label className='text-xl font-normal'>accurate cancer surveillance reports for research such as:</Label>
        </div>

        {/* Share */}
        <div className='w-1/5 px-8 text-center flex flex-col gap-4 justify-center items-center'>
          <CircleCheckBig size={120} />
          <Label className='text-3xl font-normal'>Share</Label>
          <Label className='text-xl font-normal'>support materials related to CSS and cancer care</Label>
        </div>
      </div>


      <div className='w-full flex gap-5 py-20 justify-center'>
        <Label className='text-6xl'>Sa CSS, </Label>
        <Label className='text-red-500 text-6xl'>supportado </Label>
        <Label className='text-6xl'> ang nagbibigay alalay</Label>
      </div>

      <Label className='text-xl font-normal'>Interested? Learn more.</Label>
      <div className='flex pt-10 gap-8'>
        <Button className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>How to use CSS</Button>
        <Button className='bg-red-700 hover:bg-red-900 rounded-none h-11 shadow-md text-xl'>How to use CSS</Button>
      </div>
    </div>
  )
}

export default Patient