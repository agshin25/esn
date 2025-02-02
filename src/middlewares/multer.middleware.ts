import multer from "multer";
import path from "path";
import { BadRequestError } from "../utils/error.utils";
import { existsSync, mkdirSync } from "fs";

const uploadDir = './uploads';

if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req ,file, cb) {        
        cb(null, uploadDir)
    },
    filename: function(req ,file ,cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})



export const upload = multer({
    storage: storage,
    fileFilter: (req ,file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if(allowedMimes.includes(file.mimetype)) {
            cb(null ,true)
        }else {
            cb(new BadRequestError("Invalid file type"))
        }
    }

})

