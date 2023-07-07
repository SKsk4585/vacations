import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnAuthOrized } from "../4-models/errorModel";


async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {
    try {
        const isLogd = await cyber.verifyToken(request)
        if (!isLogd) throw new UnAuthOrized("don't know you")
        next()
    } 
    catch (error) {
        next(error)
        
    }
    
}

export default verifyLoggedIn;
