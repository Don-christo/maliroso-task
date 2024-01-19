import { Router } from 'express'
import { createProduct, readProduct, updateProduct, deleteProduct } from '../../controllers/productControllers'
import { authorizationMiddleware } from '../../middlewares/authorization/authentication'

const router = Router()

router.post('/createProduct', authorizationMiddleware, createProduct)
router.get('/readProduct', authorizationMiddleware, readProduct)
router.put('/updateProduct', authorizationMiddleware, updateProduct)
router.delete('/deleteProduct', authorizationMiddleware, deleteProduct)

export default router;