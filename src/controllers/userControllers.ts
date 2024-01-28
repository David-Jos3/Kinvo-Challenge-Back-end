import { Request, Response } from 'express'
import databaseUser from '../model/userModel'
import database from '../model/movementModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const registerUser = async (request: Request, response: Response) => {
  try {
    const { username, password, email } = request.body
    if (!username || !password || !email) {
      response.status(400).json({
        message:
          'Please provide all required fields: username, password and email.',
      })
    } else {
      const passwordHash = await bcrypt.hash(password, 10)
      await databaseUser.createUserModel(username, passwordHash, email)
      response.status(201).json({ message: 'User created' })
    }
  } catch {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

const logUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body
    const passwordHash = await databaseUser.loginUserModel(email)

    if (passwordHash) {
      const result = await bcrypt.compare(password, passwordHash)
      if (result) {
        const token = jwt.sign({ email }, `${process.env.KEY_SECRET}`, {
          expiresIn: 500,
        })
        response.status(200).json({ message: 'User logged', token })
      } else response.status(401).json({ message: 'Invalid credentials' })
    } else response.status(401).json({ message: 'User Not Found' })
  } catch {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

const userUpdate = async (request: Request, response: Response) => {
  try {
    const { username, password, email } = request.body
    const { userId } = request.params
    const passwordHash = await bcrypt.hash(password, 10)
    await databaseUser.updateRegisterModel(
      username,
      passwordHash,
      email,
      Number(userId),
    )
    response.status(200).json({ message: 'user successfully updated' })
  } catch {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteUser = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params
    await database.deleteById(Number(userId))
    response.status(200).json({ message: 'user deleted' })
  } catch (erro) {
    console.error(erro)
    response.status(500).json({ message: 'Intenal Server Error' })
  }
}

export default { registerUser, logUser, userUpdate, deleteUser }
