import { FastifyPluginAsync } from 'fastify'
import HabitController from "../controllers/HabitController"

const habitRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/me', HabitController)
}

export default habitRoutes