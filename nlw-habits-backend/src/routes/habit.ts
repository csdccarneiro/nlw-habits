import { FastifyPluginAsync } from 'fastify'
import HabitController from "../controllers/HabitController"

const habitRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.post('/', HabitController.create)
}

export default habitRoutes