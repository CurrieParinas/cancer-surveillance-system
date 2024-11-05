import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export const ChangePasswordForm = (userId: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check if passwords match
    if (newPassword !== newPasswordCheck) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/css/forgotpassword/changePassword?userId=${userId.userId}&password=${newPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSuccessMessage("Password changed successfully.");
        setNewPassword('');
        setNewPasswordCheck('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to change password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-red-50 p-10 shadow-md max-w-sm w-full border-4 border-red-200">
        <h2 className="text-4xl font-bold text-center py-4 text-red-800">Change Password</h2>
        <form onSubmit={handleSubmit} className='space-y-8 py-6'>
          <div className="flex flex-col gap-2">
            <Label className="block text-xl font-medium text-red-800 text-nowrap" htmlFor="newPassword">
              New Password:
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-xl h-6 shadow-none border-t-0 border-x-0 border-b border-zinc-400 rounded-none focus-visible:ring-0"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="block text-xl font-medium text-red-800 text-nowrap" htmlFor="newPasswordCheck">
              Re-enter New Password:
            </Label>
            <Input
              id="newPasswordCheck"
              type="password"
              value={newPasswordCheck}
              onChange={(e) => setNewPasswordCheck(e.target.value)}
              className="text-xl h-6 shadow-none border-t-0 border-x-0 border-b border-zinc-400 rounded-none focus-visible:ring-0"
              required
            />
          </div>
          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
          <div className="flex justify-center items-center flex-col gap-4">
            <Button
              type="submit"
              className="bg-red-700 hover:bg-red-900 rounded-none h-11 w-1/2 shadow-md text-xl"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
