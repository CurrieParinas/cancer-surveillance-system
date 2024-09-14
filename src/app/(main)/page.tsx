import React from 'react'

import { hasUser } from './layout'
import { Login } from '@/components/organisms/login'
import { Dashboard } from '@/components/organisms/dashboard'

const HomePage = () => {
  return (
    <div className={`${hasUser ? "w-5/6" : ""}`}>
      {!hasUser ? (
        <div className="w-full flex flex-col items-center">
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