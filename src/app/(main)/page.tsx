"use client"

import React, { useEffect, useState } from 'react'

import { Login } from '@/components/organisms/login'
import { Dashboard } from '@/components/organisms/dashboard'

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className={`${isAuthenticated ? "w-5/6" : ""}`}>
      {!isAuthenticated ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Login />
        </div>
      ) : (
        <div className='w-full'>
          <Dashboard />
        </div>
      )}</div>
  )
}

export default HomePage