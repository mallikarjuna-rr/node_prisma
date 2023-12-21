import { Response, NextFunction } from "express";
import { HTTPStatus, ResponseStatus } from 'responsetypes';
import { CSRequest } from "requesttypes";
import { verifyToken } from "./jwt-token";

export const authzMiddleware = async (req: CSRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
        return res.status(<HTTPStatus>401).send({
            status: <ResponseStatus>'FAILURE',
            error: 'Unauthorized'
        });
        }
        const user = await verifyToken(token);
        if (!user) {
        return res.status(<HTTPStatus>401).send({
            status: <ResponseStatus>'FAILURE',
            error: 'Unauthorized'
        });
        }
        (req as CSRequest).user = user;
        next();
    } catch (err) {
        return res.status(<HTTPStatus>500).send({
        status: <ResponseStatus>'FAILURE',
        error: err
        });
    }
}