import express, { Request, Response } from "express"
import config from "./config"
import router from "./routers"

const app  = express()

app.use(express.json())

app.use("/api", router)

app.get("/" , (req: Request, res: Response) => {
    res.json({message: "The app is running"})
})

app.listen(config.port, () => {
    console.log(`The app is running on http://localhost:${config.port}`);
})


