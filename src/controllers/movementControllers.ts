import { Request, Response } from 'express'
import showDatabase from '../model/movementModel'

const createMovement = async (request: Request, response: Response) => {
  await showDatabase.showDATABASES()
  response.json({ message: 'TA FUNCIONANDO' })
}

export default { createMovement }
