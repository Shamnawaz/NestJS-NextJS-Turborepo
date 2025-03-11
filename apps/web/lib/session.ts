'use server';

import { jwtVerify, SignJWT } from "jose";
import { SESSION_SECRET_KEY } from "./constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user: {
        id: string,
        name: string
    },
    // accessToken: string,
    // refreshToken: string
}

const encodedKey = new TextEncoder().encode(SESSION_SECRET_KEY);

export async function createSession(payload: Session) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiredAt)
        .sign(encodedKey);

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: new Date(expiredAt),
        sameSite: "lax",
        path: "/"
    });
}

export async function getSession() {
    const cookie = cookies().get("session")?.value;
    if(!cookie) return null;

    try {

        const { payload } = jwtVerify(cookie, encodedKey, {
            algorithm: ['HS256'],
        })

        return payload as Session;
        
    } catch (error) {
        console.error('Failed to verify the session', error);
        redirect('/auth/login');
    }



    
}