import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'

function NavBar() {
  return (
    <div className='py-16 flex justify-between items-center bg-black px-20'>
        <h1 className='text-white'>WebAppLogo</h1>
        <div className='flex gap-3 shadow p-2 text-white'>
            <Link href={"/"}>Home</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            <Link href={"/profile"}>Profile</Link>
            <SignInButton />
        </div>
    </div>
  )
}

export default NavBar
