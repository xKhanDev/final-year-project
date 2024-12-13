import { NextFunction } from "express";
const AsyncHandler = (func:Function):unknown=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        Promise.resolve(func(req,res,next)).catch((err)=>next(err))
    }
}

export default AsyncHandler;