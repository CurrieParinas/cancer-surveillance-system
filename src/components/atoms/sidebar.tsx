"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Bell, CircleUserIcon, ContactRound, LayoutDashboard, LogOut, Mail, Microscope, Pill, Search, Stethoscope, Syringe } from 'lucide-react'



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
        <div className='flex flex-col w-1/6 h-screen px-6 bg-red-900 py-4 sticky top-0 gap-6'>
            <div className=''>
                <Label className='text-3xl font-extralight'>Welcome,</Label>
            </div>
            <div className='flex justify-center -my-3'>
                <CircleUserIcon size={130} strokeWidth={1} />
            </div>
            <div className='pl-4 flex flex-col'>
                <Label className='text-2xl font-[700]'>
                    Dr. {doctorInfo.userFirstname} {doctorInfo.userLastname}
                </Label>
                <Label className='text-xl font-thin'>{doctorInfo.departmentName}</Label>
                <Label className='text-xl font-thin'>{doctorInfo.hospitalName}</Label>
            </div>
            <Separator />
            <DoctorSidebar />
        </div>
    );
};

export const DoctorSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navigateTo = (route: string) => {
        router.push(route);
    };

    const isActive = (route: string) => pathname === route;

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        window.location.href = "/";
    };

    return (
        <div className='justify-between h-full flex flex-col overflow-hidden'>
            <div className='flex flex-col gap-2'>
                <div className='p-2 relative'>
                    <Input placeholder='Find patient (ID or Lastname)' className='rounded-full placeholder:text-zinc-400 py-5' />
                    <Search className="absolute right-5 bottom-[17px] text-zinc-300" size={23} />
                </div>

                <Button
                    onClick={() => navigateTo("/dashboard")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/dashboard") || isActive("/") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <LayoutDashboard /> Dashboard
                </Button>

                <Button
                    onClick={() => navigateTo("/enrollPatient")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/enrollPatient") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <ContactRound /> Enroll Patient
                </Button>

                <Button
                    onClick={() => navigateTo("/diseaseProfile")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/diseaseProfile") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Microscope /> Disease Profile
                </Button>

                <Button
                    onClick={() => navigateTo("/treatmentHistory")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/treatmentHistory") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Syringe /> Treatment History
                </Button>

                <Button
                    onClick={() => navigateTo("/consult")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/consult") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Stethoscope /> Consult
                </Button>

                <Button
                    onClick={() => navigateTo("/notification")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/notification") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Bell /> Notification
                </Button>

                <Button
                    onClick={() => navigateTo("/message")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/message") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Mail /> Message
                </Button>
            </div>

            <div>
                <Button
                    onClick={handleLogout}
                    className='w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100'
                >
                    <LogOut /> Logout
                </Button>
            </div>
        </div>
    );
}

