import Login from '@/components/auth/Login'
import { requireUnAuth } from '@/modules/auth/utils/auth-utils'
import React from 'react'

const LoginPage = async() => {
 await requireUnAuth()
  return (
      <div className=''>
          <Login/>
    </div>
  )
}

export default LoginPage