import * as express from 'express'
import ThreadControllers from '../controllers/ThreadControllers'
import AuthControllers from '../controllers/AuthControllers'
import AuthenticationMiddlewares from "../middlewares/Auth"
import FileUpload from '../middlewares/UploadFile'
import LikeControllers from '../controllers/LikeControllers'
import ReplyControllers from '../controllers/ReplyControllers'

const router = express.Router()
const UploadMiddleware = new FileUpload("image")

// CRUD Threads
router.get("/threads", ThreadControllers.find)
router.get("/thread/:id", ThreadControllers.findOne)
// router.patch("/thread/:id", ThreadControllers.update)
// router.delete("/thread/:id", ThreadControllers.delete)
router.post("/thread", AuthenticationMiddlewares.Authentication, UploadMiddleware.handleUpload.bind(UploadMiddleware), ThreadControllers.create)

// AUTH 
router.post("/auth/register", AuthControllers.register)
router.post("/auth/login", AuthControllers.login)
router.get("/auth/check", AuthenticationMiddlewares.Authentication, AuthControllers.check)

// LIKE
router.post("/like", AuthenticationMiddlewares.Authentication, LikeControllers.create)

// REPLY'
router.post("/reply", AuthenticationMiddlewares.Authentication, ReplyControllers.create)
router.get("/replies", AuthenticationMiddlewares.Authentication, ReplyControllers.find)

export default router