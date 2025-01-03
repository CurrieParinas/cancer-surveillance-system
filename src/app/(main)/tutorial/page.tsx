
import { Label } from '@/components/ui/label';
import React from 'react';


const Tutorial = () => {
  return (
    <div className="w-full bg-white text-gray-900 p-16 flex flex-col space-y-16 pt-32">
    
      {/* Landing Page Section */}
      <div className="relative w-full h-[100px]">
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-10">
          <div className="py-8 flex flex-col gap-8 ">
            <Label className='text-6xl font-semibold text-black'>Landing Page</Label>
          </div>
        </div>
      </div>

      {/* Video Content*/} 
      <div className="flex flex-col md:flex-row md:space-x-16 p-4 justify-center items-center">
        <div className="w-full md:w-1/2 ">
          <iframe
            width="100%"
            height="550" 
            src="https://www.youtube.com/embed/DFuVRNVgI7A"
            title="Landing Page"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Doctor Page Section */}
      <div className="relative w-full h-[100px]">
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-10">
          <div className="py-8 flex flex-col gap-8">
            <Label className='text-6xl font-semibold text-black'>Doctor Page</Label>
          </div>
        </div>
      </div>

      {/* Doctor Video Content*/}
      <div className="flex flex-col md:flex-row md:space-x-16 p-4 justify-center items-center">
        <div className="w-full md:w-1/2">
          <iframe
            width="100%"
            height="550"
            src="https://www.youtube.com/embed/2wXSqnkOJK8"
            title="Doctor Page"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    
      {/* Patient Page Section */}
      <div className="relative w-full h-[100px]">
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-10">
          <div className="py-8 flex flex-col gap-8">
            <Label className='text-6xl font-semibold text-black'>Patient Page</Label>
          </div>
        </div>
      </div>

      {/* Patient Video Content*/}
      <div className="flex flex-col md:flex-row md:space-x-16 p-4 justify-center items-center">
        <div className="w-full md:w-1/2">
          <iframe
            width="100%"
            height="550"
            src="https://www.youtube.com/embed/26uC4C0Xrgs"
            title="Patient Page"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* User Manual Section */}
      <div className="relative w-full h-[100px]">
        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-10">
          <div className="py-8 flex flex-col gap-8">
            <Label className='text-6xl font-semibold text-black'>User Manual</Label>
          </div>
        </div>
      </div>

      {/* User Manual Content*/}
      <div className="flex flex-col md:flex-row md:space-x-16p-4 justify-center items-center">
        <div className="w-full md:w-1/2">
        <iframe
            src="/CSS_User_Manual_Parinas_Team.pdf"
            width="100%"
            height="1080px"
            title="User Manual PDF"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
