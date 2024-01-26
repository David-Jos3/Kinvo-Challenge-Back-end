import { Router } from 'express'
import movementControllers from '../controllers/movementControllers'

const router = Router()

router.get('/movement', movementControllers.getFilteredAndPaginatedMovements)
router.get('/movement/:userId', movementControllers.getMovementById)
router.get('/balance/:userId', movementControllers.balanceMovement)
router.post('/movement', movementControllers.createMovement)
router.put('/movement/:userId', movementControllers.updateMovement)
router.delete('/movement/:userId', movementControllers.deleteMovement)

export default router
