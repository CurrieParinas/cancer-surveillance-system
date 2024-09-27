"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'



export const Sidebar = () => {
    const [doctorInfo, setDoctorInfo] = useState({
        userFirstname: '',
        userLastname: '',
        departmentName: '',
        hospitalName: '',
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUserData = JSON.parse(userData);

            // Ensure the structure matches your API response
            setDoctorInfo({
                userFirstname: parsedUserData.user.userFirstname,
                userLastname: parsedUserData.user.userLastname,
                departmentName: parsedUserData.department.departmentName,
                hospitalName: parsedUserData.hospital.hospitalName,
            });
        }
    }, []);


    return (
        <div className='flex flex-col w-1/6 h-screen px-6 bg-red-900 py-4'>
            <div className='py-4'>
                <Label className='text-3xl italic'>Welcome,</Label>
            </div>
            <div className='pl-4 pb-4 flex flex-col'>
                <Label className='text-2xl'>
                    Dr. {doctorInfo.userFirstname} {doctorInfo.userLastname}
                </Label>
                <Label className='text-xl font-normal'>{doctorInfo.departmentName}</Label>
                <Label className='text-xl font-normal'>{doctorInfo.hospitalName}</Label>
            </div>
            <Separator />
            <DoctorSidebar />
        </div>
    );
};
export const DoctorSidebar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <div className='py-4 justify-between h-full flex flex-col'>
            <div>
                <Button onClick={() => router.push("/")} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>Dashboard</Button>
                <Button onClick={() => router.push("/enrollPatient")} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>Enroll Patient</Button>
                <Button onClick={() => router.push("/diseaseProfile")} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>Disease Profile</Button>
                <Button onClick={() => router.push("/treatmentHistory")} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>Treatment History</Button>
                <Button onClick={() => router.push("/consult")} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>Consult</Button>
                <Button onClick={() => router.push("/notification")} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>Notification</Button>
                <Button onClick={() => router.push("/message")} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>Message</Button>
                <div className='pt-4'>
                    <Button onClick={handleLogout} className='w-full bg-transparent shadow-none justify-start text-xl py-6'>
                        Logout
                    </Button>
                </div>
            </div>
            <div className='p-4 relative'>
                <Input placeholder='Find patient (ID or Lastname)' className='rounded-full placeholder:text-zinc-400 py-5' />
                <Search className="absolute right-7 bottom-6 text-zinc-300" size={23} />
            </div>

        </div>
    );
}

