import Link from 'next/link';
import React from 'react'
import SignUpForm from './signup-form';

function SignUpPage () {
  return (
    <section className='bg-black text-white h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center p-8 rounded-lg shadow-lg'>
        <h1 className='text-center text-2xl font-bold mb-4'>Sign Up Page</h1>
        <SignUpForm />

        <div className='flex justify-between text-sm'>
          <p>Already have an account ?</p>
          <Link className='underline' href={'/auth/login'}>Sign In</Link>
        </div>
      </div>
    </section>

  )
}

export default SignUpPage;
