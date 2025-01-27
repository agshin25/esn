import { NextFunction, Request, Response } from "express"
import blogServices from "../services/blogs.service"

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await blogServices.create(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const blogControllers = {
    create
}

export default blogControllers