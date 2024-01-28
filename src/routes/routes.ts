import { Router } from 'express'
import movementControllers from '../controllers/movementControllers'
import userControllers from '../controllers/userControllers'
import authMiddlewares from '../middlewares/authMiddlewares'

const router = Router()

router.post('/login', userControllers.logUser)
router.post('/register', userControllers.registerUser)
router.put('/users/:userId', userControllers.userUpdate)
router.delete('/users/:userId', userControllers.deleteUser)
router.get(
  '/movement',
  authMiddlewares,
  movementControllers.getFilteredAndPaginatedMovements,
)
router.get(
  '/movement/:userId',
  authMiddlewares,
  movementControllers.getMovementById,
)
router.get(
  '/balance/:userId',
  authMiddlewares,
  movementControllers.balanceMovement,
)

router.post('/movement', movementControllers.createMovement)
router.put('/movement/:userId', movementControllers.updateMovement)
router.delete('/movement/:userId', movementControllers.deleteMovement)

export default router
