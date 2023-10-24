import * as express from 'express'
import ThreadControllers from '../controllers/ThreadControllers'

const router = express.Router()

router.get("/threads", ThreadControllers.find)
router.get("/thread/:id", ThreadControllers.findOne)
router.patch("/thread/:id", ThreadControllers.update)
router.delete("/thread/:id", ThreadControllers.delete)
router.post("/thread", ThreadControllers.create)

export default router