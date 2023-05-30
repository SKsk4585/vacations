import { NextFunction, Request, Response } from "express";

function deleteMessage(request: Request, response: Response, next: NextFunction) {

    console.log("Are you sure you want to delete the vacation?");

    // Transfer flow to next middleware or to controller:
    next();
}

export default deleteMessage;

