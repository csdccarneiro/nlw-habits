import { FastifyPluginAsync } from 'fastify'
import DayController from "../controllers/DayController"

const dayRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/', DayController.index)
}

export default dayRoutes