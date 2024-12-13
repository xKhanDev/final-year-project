import ApiError from "./ApiError"
import fs from "fs"

const fileDeletion = (imagePath:string):boolean=>{
    if(!fs.existsSync(imagePath)){
        throw new ApiError(404,"File not found")
    }

    fs.unlinkSync(imagePath);
    return true;
}

export default fileDeletion;