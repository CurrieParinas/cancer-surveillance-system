import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'
import Logo from '/public/logo/upm-colored.png'
import { ForgotPasswordForm } from '@/components/organisms/forgot-password'

const ForgotPassword = () => {
  return (
    <div className='w-full text-black h-screen flex justify-center items-center py-28'>
      <div className='w-3/5 flex flex-col items-center'>
        <div className='w-full flex justify-center items-center px-32 gap-6'>
          <Image src={Logo} width={300} height={300} className='shrink-0 object-contain' alt='upm-logo' />
          <Label className='text-8xl px-2'>Cancer Surveillance System</Label>
        </div>
        <Label className='pt-20 text-5xl kalam-font'>&quot;Magkasama natin puksain ang kanser&quot;</Label>
      </div>
      <div className='w-2/5 flex items-center justify-center'>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default ForgotPassword