import axios from 'axios';

const API_KEY = 'sk_2vDXGDgM2LZASiyOWWgcthS73Oy';
const AUTH_URL = 'https://api.jellyfaas.com/auth-service/v1/validate';
const BASE_URL = 'https://api.jellyfaas.com/spacestation-cvm2ffq9io6g00dj7vpg-1-s';

let tokenCache: string | null = null;

export async function getToken(): Promise<string> {
    if (tokenCache) return tokenCache;

    try {
        const res = await axios.get(AUTH_URL, {
            headers: { 'x-jf-apikey': API_KEY }
        });

        console.log('JFWT Token:', res.data.token);
        tokenCache = res.data.token;
        return tokenCache;
    } catch (error) {
        console.error('Failed to fetch token:', error);
        throw error;
    }
}

export async function fetchSpaceData(station?: string, artifact?: string, historic?: boolean) {
    const token = await getToken();

    const params: Record<string, string> = {};
    if (station) params.station = station;
    if (artifact) params.artifact = artifact;
    if (historic) params.historic = 'true';

    const res = await axios.get(BASE_URL, {
        headers: { jfwt: token },
        params
    });

    return res.data;
}