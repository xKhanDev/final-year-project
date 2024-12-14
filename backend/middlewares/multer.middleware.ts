import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req:Request,file:Express.Multer.File,cb:Function){
        cb(null,path.resolve(__dirname,"../frontend/public/uploads"));
    },
    filename:function(req:Request,file:Express.Multer.File,cb:Function):void{
        cb(null,`${file.originalname}-${Date.now()}`)
    }
})

export const upload = multer({storage:storage});