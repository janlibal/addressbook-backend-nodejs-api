import Router from 'koa-router'
import testRoutes from './testRoutes'
import userRoutes from './userRoutes'
import addressRoutes from './addressRoutes'
import { handleNotFound } from '../middleware/routeNotFound'

const router = new Router()
const api = new Router()
const test = new Router()

test.use(testRoutes)
api.use(userRoutes)
api.use(addressRoutes)

router.use('', test.routes())
router.use('/api/v1', api.routes())
router.use(handleNotFound)

export default router