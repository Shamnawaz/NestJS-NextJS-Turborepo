"use server";

import { FormState, signupFormSchema } from "./type";

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

    
}