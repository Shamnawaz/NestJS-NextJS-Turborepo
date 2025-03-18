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
    accessToken: string,
    refreshToken: string
}

const encodedKey = new TextEncoder().encode(SESSION_SECRET_KEY);

export async function createSession(payload: Session) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiredAt)
        .sign(encodedKey);

    const cookieStore = cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: new Date(expiredAt),
        sameSite: "lax",
        path: "/"
    });
}

export async function getSession() {
    const cookie = await cookies().get("session")?.value;
    if(!cookie) return null;

    try {

        const { payload } = await jwtVerify(cookie, encodedKey, {
            algorithms: ['HS256'],
        })

        return payload as Session;
        
    } catch (error) {
        console.error('Failed to verify the session', error);
        redirect('/auth/login');
    }
}

export async function deleteSession() {
    await cookies().delete("session");
}

export async function updateToken({accessToken, refreshToken}: { accessToken: string, refreshToken: string }) {
    const cookie = cookies().get('session')?.value;
    if(!cookie) return null;

    const { payload } = await jwtVerify<Session>(cookie, encodedKey);

    if(!payload) throw new Error('Session not found');

    const newPayload: Session = {
        user: {
            ...payload.user
        },
        accessToken,
        refreshToken
    };

    await createSession(newPayload);
}