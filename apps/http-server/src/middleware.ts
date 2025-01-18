import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"
import { AuthenticatedRequest } from "./types";

export const middleware = (req: AuthenticatedRequest , res : Response , next : NextFunction) => {
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token , JWT_SECRET) as { userId :string}

    if(decoded){
        req.userId = decoded.userId;
        next();
    }else {
        res.status(403).json({
            message: "Error in middleware : Unauthorized"
        })
    }   
}