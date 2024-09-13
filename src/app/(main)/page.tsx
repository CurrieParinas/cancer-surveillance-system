import React from 'react'

import { hasUser } from './layout'
import { Login } from '@/components/organisms/login'

const HomePage = () => {
  return (
    <div className=''>
      {!hasUser ? (
        <div className="w-full flex flex-col items-center">
          <Login />
        </div>
      ) : (
        <div className=''>
          Homepage
        </div>
      )}</div>
  )
}

export default HomePage