'use server';

import { authFetch } from "./authFetch";
import { BACKEND_URL } from "./constants";
import { getSession } from "./session";

export const getProfile = async () => {
    // const session = await getSession();

    // const response = await fetch(`${BACKEND_URL}/auth/protected`, {
    //     method: 'GET',
    //     headers: {
    //         authorization: `Bearer ${session?.accessToken}`
    //     }
    // })

    const response = await authFetch(`${BACKEND_URL}/auth/protected`);

    const res = await response.json();

    return res;
}