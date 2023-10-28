import * as express from 'express'
import ThreadControllers from '../controllers/ThreadControllers'
import AuthControllers from '../controllers/AuthControllers'
import AuthenticationMiddlewares from "../middlewares/Auth"
import UploadFile from '../middlewares/UploadFile'

const router = express.Router()

// CRUD Threads
router.get("/threads", ThreadControllers.find)
router.get("/thread/:id", ThreadControllers.findOne)
router.patch("/thread/:id", ThreadControllers.update)
router.delete("/thread/:id", ThreadControllers.delete)
router.post(
    "/thread", 
    AuthenticationMiddlewares.Authentication, 
    UploadFile.Upload("image"),
    ThreadControllers.create
)

// AUTH 
router.post("/auth/register", AuthControllers.register)
router.post("/auth/login", AuthControllers.login)
router.get("/auth/check", AuthenticationMiddlewares.Authentication, AuthControllers.check)

export default router