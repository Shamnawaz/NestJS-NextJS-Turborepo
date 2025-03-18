import { refreshToken } from "./auth";
import { getSession } from "./session";

export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

// Wrapper Function
export const authFetch = async (url: string | URL, options: FetchOptions = {}) => {

    const session = await getSession();

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${session?.accessToken}`
    };
    let res = await fetch(url, options);

    if(res.status === 401) {
        if(!session?.refreshToken) throw new Error('Refresh Token not found');

        const newAccessToken = await refreshToken(session.refreshToken);

        if(newAccessToken) {
            options.headers.Authorization = `Bearer ${newAccessToken}`;
            res = await fetch(url, options);
        }
    }

    return res;
}