import express, { Request, Response } from "express"
import "reflect-metadata"
import "./config/database"
import config from "./config"
import router from "./routers"
import { errorMiddleware } from "./middlewares/error.middleware"

const app  = express()

app.use(express.json())


app.use("/api", router)

app.get("/" , (req: Request, res: Response) => {
    res.json({message: "The app is running"})
})



app.use(errorMiddleware)

app.listen(config.port, () => {
    console.log(`The app is running on http://localhost:${config.port}`);
})


