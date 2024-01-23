import { Router } from 'express'
import movementControllers from '../controllers/movementControllers'

const router = Router()

router.get('/movement', movementControllers.createMovement)

export default router
