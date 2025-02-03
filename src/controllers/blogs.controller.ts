import { NextFunction, Request, Response } from "express"
import blogServices from "../services/blogs.service"
import { AppError } from "../utils/error.utils"


const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await blogServices.getBlogs()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await blogServices.getBlog(+req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const filePaths = (req.files as Express.Multer.File[]).map(file => file.path);
        const response = await blogServices.create(filePaths, req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filePaths = (req.files as Express.Multer.File[]).map(file => file.path);
        const response = await blogServices.update(+req.params.id,filePaths, req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await blogServices.deleteBlog(+req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const blogControllers = {
    create,
    getBlogs,
    getBlog,
    update,
    deleteBlog
}

export default blogControllers