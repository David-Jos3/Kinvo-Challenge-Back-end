import { Request, Response } from 'express'
import Database from '../model/movementModel'

const getMovement = async (request: Request, response: Response) => {
  try {
    const transactions = await Database.findTransactions()
    response.status(200).json(transactions)
  } catch {
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

const getMovementById = async (request: Request, response: Response) => {
  const { userId } = request.params
  const id = await Database.findUserById(Number(userId))
  response.status(201).json(id)
}

const createMovement = async (request: Request, response: Response) => {
  try {
    const { userId, type, amount, date, description } = request.body
    await Database.insertTransactions(userId, type, amount, date, description)
    response.status(201).json({ message: 'DADOS ENVIADOS' })
  } catch {
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

const updateMovement = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params
    const { type, amount, date, description } = request.body
    await Database.update(Number(userId), type, amount, date, description)

    response.status(200).json({ message: 'Update successful' })
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

const deleteMovement = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params
    await Database.deleteById(Number(userId))
  } catch {
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

export default {
  createMovement,
  getMovement,
  getMovementById,
  updateMovement,
  deleteMovement,
}
