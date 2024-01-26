import { Request, Response } from 'express'
import database from '../model/movementModel'

const getFilteredAndPaginatedMovements = async (
  request: Request,
  response: Response,
) => {
  try {
    const { dateInit, dateEnd, limit, page } = request.query

    const pages = Number(page || 1)
    const limits = Number(limit || 10)
    const offSet = (pages - 1) * limits

    const dateInitQuery = new Date(dateInit as string)
    const dateEndQuery = new Date(dateEnd as string)

    const transactions = await database.findTransactions(
      dateInitQuery,
      dateEndQuery,
      limits,
      offSet,
    )
    !dateInit || !dateEnd
      ? response.status(201).json(transactions.allTransactions)
      : response.status(201).json(transactions.filteredTransactions)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

const getMovementById = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params
    const id = await database.findUserById(Number(userId))
    response.status(201).json(id)
  } catch {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

const createMovement = async (request: Request, response: Response) => {
  try {
    const { userId, type, amount, date, description } = request.body
    console.log(userId, type, amount, date, description)
    await database.insertTransactions(userId, type, amount, date, description)
    response.status(201).json({ message: 'DATA SENT' })
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

const updateMovement = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params
    const { type, amount, date, description } = request.body
    await database.update(Number(userId), type, amount, date, description)

    response.status(200).json({ message: 'Update successful' })
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

const deleteMovement = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params
    await database.deleteById(Number(userId))
  } catch {
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

const balanceMovement = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params
    const balance = await database.getBalance(Number(userId))
    response.status(200).json(balance)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Internal Error' })
  }
}

export default {
  createMovement,
  getFilteredAndPaginatedMovements,
  getMovementById,
  updateMovement,
  deleteMovement,
  balanceMovement,
}
