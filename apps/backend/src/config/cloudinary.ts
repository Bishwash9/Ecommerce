import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary environment variables');
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});


export const uploadImage =  (buffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'Eazy',
                resource_type: 'image',
            },
            (error, result) => {
                if(error) {
                    reject(error);
                    return;
                }
                if(!result){
                    reject(new Error('No result returned from Cloudinary'));
                    return;
                }

                resolve(result.secure_url);
            },
        );

        uploadStream.end(buffer);
    });
};