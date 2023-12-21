declare module 'requesttypes' {
    import { Request } from 'express';
    export interface CSRequest extends Request {
        user: any;
    }
}