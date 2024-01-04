import { Router } from 'express'
import guildsRoutes from './guilds'
import queueRoutes from './queue'
import searchRoutes from './search'
import usersRoutes from './users'

const router = Router()

router.use('/guilds', guildsRoutes)
router.use('/queue', queueRoutes)
router.use('/search', searchRoutes)
router.use('/users', usersRoutes)

export default router
