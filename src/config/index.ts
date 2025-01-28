import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../.env.local");
dotenv.config({ path: envPath });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "supersecret123",
};
