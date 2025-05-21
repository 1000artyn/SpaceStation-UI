import { json } from '@sveltejs/kit';
import axios from 'axios';

const API_KEY = 'sk_2vDXGDgM2LZASiyOWWgcthS73Oy';
const AUTH_URL = 'https://api.jellyfaas.com/auth-service/v1/validate';
const BASE_URL = 'https://api.jellyfaas.com/spacestation-cvm2ffq9io6g00dj7vpg-1-s';

export async function GET({ url }) {
    try {
        const authRes = await axios.get(AUTH_URL, {
            headers: { 'x-jf-apikey': API_KEY }
        });

        const token = authRes.data.token;

        const station = url.searchParams.get('station');
        const artifact = url.searchParams.get('artifact');
        const historic = url.searchParams.get('historic');

        const params: Record<string, string> = {};
        if (station) params.station = station;
        if (artifact) params.artifact = artifact;
        if (historic === 'true') params.historic = 'true';

        const res = await axios.get(BASE_URL, {
            headers: { jfwt: token },
            params
        });

        return json(res.data);
    } catch (err: any) {
        console.error('Server Error:', err.response?.data || err.message);
        return new Response(JSON.stringify({ error: 'API fetch failed' }), {
            status: 500
        });
    }
}