"use client";

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/ui/submitButton'
import { signUp } from '@/lib/auth';
import React, { useActionState } from 'react'

function SignUpForm() {
    const [state, action] = useActionState(signUp, undefined);

    return (
    <form action={action}>
        <div className='flex flex-col gap-2'>
            {state?.message && <p className='text-sm text-red-500'>{state.message}</p>}
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id='name' name="name" placeholder='John Doe' />
            </div>
            {state?.error?.name && <p className='text-sm text-red-500'>{state.error.name}</p>}

            <div>
                <Label htmlFor="email">Email</Label>
                <Input id='email' name="name" placeholder='John@example.com' />
            </div>
            {state?.error?.email && <p className='text-sm text-red-500'>{state.error.email}</p>}

            <div>
                <Label htmlFor="password">Password</Label>
                <Input id='password' name="password" placeholder='password' />
            </div>
            {state?.error?.password && (
                <div className='text-sm text-red-500'>
                    <p>Password Must :</p>
                    <ul>
                        {state.error.password.map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <SubmitButton>Sign Up</SubmitButton>
        </div>
    </form>
    )
}

export default SignUpForm
