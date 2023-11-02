import * as express from 'express'
import ThreadControllers from '../controllers/ThreadControllers'
import AuthControllers from '../controllers/AuthControllers'
import AuthenticationMiddlewares from "../middlewares/Auth"
import FileUpload from '../middlewares/UploadFile'
import LikeControllers from '../controllers/LikeControllers'
import ReplyControllers from '../controllers/ReplyControllers'
import ThreadQueue from '../queue/ThreadQueue'

const router = express.Router()
const UploadMiddleware = new FileUpload("image")
const Thread = new ThreadControllers()

// CRUD Threads
router.get("/threads", async (req: express.Request, res: express.Response) => {
   await Thread.find(req, res)
})

router.get("/thread/:id", async (req: express.Request, res: express.Response) => {
  await Thread.findOne(req, res);
});

router.post("/thread", AuthenticationMiddlewares.Authentication, UploadMiddleware.handleUpload.bind(UploadMiddleware), ThreadQueue.create)

// AUTH 
router.post("/auth/register", AuthControllers.register)
router.post("/auth/login", AuthControllers.login)
router.get("/auth/check", AuthenticationMiddlewares.Authentication, AuthControllers.check)

// LIKE
router.post("/like", AuthenticationMiddlewares.Authentication, LikeControllers.create)

// REPLY'
router.post("/reply", AuthenticationMiddlewares.Authentication, ReplyControllers.create)
router.get("/replies", AuthenticationMiddlewares.Authentication, ReplyControllers.find)

// NOTIFICATION
router.get("/notifications", (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write("event: message\n");
  function sendNotification(data: any) {
    res.write("data:" + data + "\n\n");
  }

  router.get("/new-thread", (req, res) => {
    const data = JSON.stringify({ data: "new thread!" });
    sendNotification(data);

    res.sendStatus(200);
  });
});

export default router