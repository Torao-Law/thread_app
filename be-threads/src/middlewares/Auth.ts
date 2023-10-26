import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default new class AuthenticationMiddlewares {
  Authentication(req: Request, res: Response, next: NextFunction) : Response {
    try {
      const Authorization = req.headers.authorization

      if(!Authorization || !Authorization.startsWith("Bearer ")) {
        return res.status(401).json({ Error: "Unauthorized" })
      }

      const token = Authorization.split(" ")[1]

      try {
        const logginSession = jwt.verify(token, "pinjam_seratus")
        res.locals.logginSession = logginSession
        next()
      } catch (err) {
        return res.status(401).json({ Error: "Unauthorized" })
      }
    } catch (err) {
      return res.status(500).json({ Error: "Error while authenticating" })
    }
  }
}

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMDkxZmNlYi1jNTI5LTQ2MzYtODhmNS01OWRjMzFmMjZkMGQiLCJlbWFpbCI6ImhpLmRhbmRpOUBnbWFpbC5jb20iLCJyb2xlcyI6W3siaWQiOiJVU0VSIiwibmFtZSI6IlVTRVIifV0sImlhdCI6MTY5ODI5MTU4NSwiZXhwIjoxNjk4Mzc3OTg1fQ.aBfO-jlSBEMPIXvNvOunJELUKzFswWSogvvtuAmpdXI

// ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMDkxZmNlYi1jNTI5LTQ2MzYtODhmNS01OWRjMzFmMjZkMGQiLCJlbWFpbCI6ImhpLmRhbmRpOUBnbWFpbC5jb20iLCJyb2xlcyI6W3siaWQiOiJVU0VSIiwibmFtZSI6IlVTRVIifV0sImlhdCI6MTY5ODI5MTU4NSwiZXhwIjoxNjk4Mzc3OTg1fQ.aBfO-jlSBEMPIXvNvOunJELUKzFswWSogvvtuAmpdXI"]