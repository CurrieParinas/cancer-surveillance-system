"use client"

import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/forgotpassword/createForgotPassword?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({ title: 'Email sent successfully' });
        console.log('Forgot password request successful', response);
        router.push('/');
      } else {
        console.error('Failed to submit forgot password request');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-red-50 p-10 py-20 gap-4 flex flex-col rounded-lg shadow-md max-w-sm w-full border border-red-200">
        <h2 className="text-4xl font-bold text-center py-4 text-red-800">Forgot Password</h2>
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
          <div className="flex justify-center items-center flex-col gap-4">
            <Button
              type="submit"
              className="bg-red-700 hover:bg-red-900 rounded-md h-11 w-1/2 shadow-md text-xl"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
