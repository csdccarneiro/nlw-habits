import { FastifyPluginAsync } from 'fastify'
import SummaryController from "../controllers/SummaryController"

const summaryRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/', SummaryController.index)
}

export default summaryRoutes