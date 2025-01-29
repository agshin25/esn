import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../.env.local");
dotenv.config({ path: envPath });

export default {
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
