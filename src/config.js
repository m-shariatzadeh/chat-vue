export const API_URL = (
    import.meta.env.VITE_API_URL || 'base url'
).replace(/\/*$/, '') + '/';

export const API_PROXY_URL = (
    import.meta.env.VITE_API_PROXY_URL || 'url'
).replace(/\/*$/, '') + '/';


export const API_PROXY_ENABLE = import.meta.env.VITE_API_PROXY_ENABLE || false;

export const API_FULL_URL = (API_PROXY_ENABLE ? API_PROXY_URL : '') + API_URL;