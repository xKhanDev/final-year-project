import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY
})

const uploadOnCloudnary = async (localPath:any) => {
    try {
        if(!localPath) return null;

        const response = await cloudinary.uploader.upload(localPath,{
            resource_type:"auto"
        })

        console.log("file is uploaded on cloudnary",response.url)

        return response;
        
    } catch (error:any) {
        console.log("ERROR WHILE UPLOADING ON CLOUDNARY",error.message)
        return null;
    }
}

export default uploadOnCloudnary;