import * as Cookies from 'js-cookie';

/** Get user token */
export const getToken = (): string | undefined => Cookies.get(process.env.SESSION_COOKIE_NAME || 'token');
