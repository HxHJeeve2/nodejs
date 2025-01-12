import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret_token = process.env.ACCESS_TOKEN as string;

export default class RouterMiddleware{
    static routerMiddleware( req:Request, res:Response, next:NextFunction ){
        const authorizationHeader = req.headers.authorization || "";
        const bearerToken: string[] = authorizationHeader.split(" ");

        if (bearerToken.length !== 2 || bearerToken[0] !== "Bearer") {
            res.status(401).json({ message: 'Access Denied. No token provided.' });
            return;
        }

        const token = bearerToken[1];

        try{
            jwt.verify(token, secret_token, (err) => {
                if (err) {
                    res.status(401).json({ message: "Invalid Token" });
                    return;
                } else {
                    next();
                }
            });
        }catch(err:unknown){
            res.status(500).json({ message: "Internal Server Error",err });
        }
    };
};