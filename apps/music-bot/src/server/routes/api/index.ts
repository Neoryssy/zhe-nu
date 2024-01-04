import { Router } from 'express'
import guildsRoutes from './guilds'
import searchRoutes from './search'
import usersRoutes from './users'

const router = Router()

router.use('/guilds', guildsRoutes)
router.use('/search', searchRoutes)
router.use('/users', usersRoutes)

export default router
