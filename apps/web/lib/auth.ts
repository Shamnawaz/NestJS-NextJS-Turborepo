"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, loginFormSchema, signupFormSchema } from "./type";
import { createSession, updateToken } from "./session";

export async function signUp(state: FormState , formData: FormData ): Promise<FormState> {
    const validationFields = signupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    });

    if(!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors
        };
    }

    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validationFields.data)
    });

    if(response.ok) {
        redirect('/auth/login');
    } else {
        return {
            message: response.status === 409 ? "User already registered" : response.statusText
        }
    }
    
}

export async function signIn(state: FormState, formData: FormData): Promise<FormState> {
    const validationFields = loginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if(!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors
        };
    }

    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validationFields.data)
    });

    if(response.ok) {
        const result = await response.json();
        // Create the session for authenticated user
        await createSession({
            user: {
                id: result.id,
                name: result.name
            },
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        })
        redirect('/');
        
    } else {
        return {
            message: response.status === 401 ? "Invalid credentials" : response.statusText
        }
    }
}

export const refreshToken = async (oldRefreshToken: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            body: JSON.stringify({
                refresh: oldRefreshToken
            })
        })

        if(!response.ok) throw new Error('Failed To Refresh Token');

        const { accessToken, refreshToken } = await response.json();
        // Update session with new tokens
        await updateToken({ accessToken, refreshToken });

        return accessToken;

    } catch (err) {
        console.error('refresh Token failed :', err);
        return null;
    }
}