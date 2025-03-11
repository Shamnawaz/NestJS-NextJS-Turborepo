import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/ui/submitButton'
import React from 'react'

function SignUpForm() {
  return (
    <form action="">
        <div className='flex flex-col gap-2'>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id='name' name="name" placeholder='John Doe' />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input id='email' name="name" placeholder='John@example.com' />
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input id='password' name="password" placeholder='password' />
            </div>
            <SubmitButton>Sign Up</SubmitButton>
        </div>
    </form>
  )
}

export default SignUpForm
