"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, loginFormSchema, signupFormSchema } from "./type";
import { createSession } from "./session";

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
        })
        redirect('/');
        
    } else {
        return {
            message: response.status === 401 ? "Invalid credentials" : response.statusText
        }
    }
}