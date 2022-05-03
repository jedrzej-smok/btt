import * as express from 'express';
import {NextFunction, Request, Response} from "express";
export class ValidationError extends Error {}

export const handleError = (err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .send(err instanceof ValidationError ? err.message : 'Backend internal error',
        );
};

