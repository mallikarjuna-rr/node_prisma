import { Response, CookieOptions } from 'express';

export const addCookie = async (res: Response, name: string, value: string, domain: string, httpOnly: boolean) => {
    const options: CookieOptions = {
        domain: domain,
        httpOnly: httpOnly || true,
        secure: true,
        sameSite: 'strict',
        maxAge: 28800 * 1000
    };

    res.cookie(name, value, options);
    return 'cookie created successfully'
}