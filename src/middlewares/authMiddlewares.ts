import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
declare module 'express' {
  interface Request {
    userEmail?: string
  }
}

const validationToken = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers
  if (!authorization) {
    return response.status(401).json({ message: 'Unauthorized' })
  }

  const token = authorization.replace('Bearer', '').trim()
  try {
    const data = jwt.verify(token, `${process.env.KEY_SECRET}`)
    const { email } = data as JwtPayload
    request.userEmail = email
    next()
  } catch {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

export default validationToken
