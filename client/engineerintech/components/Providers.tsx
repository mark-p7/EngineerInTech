import React from 'react'
import UserProvider from '@/app/context/userContext'

export function Provider({children}: { children: React.ReactNode}) {
  return (
    <>
        <UserProvider>
            {children}
        </UserProvider>
    </>
  )
}

export default Provider