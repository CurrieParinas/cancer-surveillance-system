"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Logo from '/public/logo/upm-colored.png';
import { ChangePasswordForm } from '@/components/organisms/change-password';

const ChangePasswordPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userId = searchParams.get('userId');
  useEffect(() => {
    console.log("Change password page:", searchParams.get('userId'))
  })

  return (
    <div className='w-full text-black h-screen flex py-28'>
      <div className='w-3/5 flex flex-col justify-center items-center'>
        <div className='w-full flex justify-center items-center px-32 gap-6'>
          <Image src={Logo} width={300} height={300} className='shrink-0 object-contain' alt='upm-logo' />
          <Label className='text-8xl px-2'>Cancer Surveillance System</Label>
        </div>
        <Label className='pt-20 text-5xl kalam-font'>&quot;Magkasama natin puksain ang kanser&quot;</Label>
      </div>
      <div className='w-2/5 flex items-center justify-center'>
        {userId && <ChangePasswordForm userId={userId} />}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
