<<<<<<< HEAD
import dotenv from "dotenv"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';
=======
import dotenv from "dotenv";
import path from "path";
>>>>>>> 58919d86cfac24af55a9d9f89eabc910b79f85b2

const envPath = path.join(__dirname, "../../.env.local");
dotenv.config({ path: envPath });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})




export default {
<<<<<<< HEAD
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL || "",
    jwtSecret: process.env.JWT_SECRET || "supersecret123",
    cloudinary
}
=======
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "supersecret123",
  smtp: {
    host: process.env.SMTP_HOST || "",
    password: process.env.SMTP_PASS || "",
    user: process.env.SMTP_USER || "",
  },
  senderMail: process.env.SENDER_MAIL,
};
>>>>>>> 58919d86cfac24af55a9d9f89eabc910b79f85b2
