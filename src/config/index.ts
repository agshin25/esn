import dotenv from "dotenv"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';


const envPath = path.join(__dirname, "../../.env");
dotenv.config({ path: envPath });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export default {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL || "",
    jwtSecret: process.env.JWT_SECRET || "supersecret123",
    cloudinary
}

