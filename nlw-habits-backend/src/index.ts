import fastify from "fastify";
import cors from "@fastify/cors";
import habitRoutes from "./routes/habit"
import dayRoutes from "./routes/day"
import summaryRoutes from "./routes/summary"

const server = fastify({ logger: true })

server.register(cors)

server.register(habitRoutes, { prefix: "/habits" })

server.register(dayRoutes, { prefix: "/day" })

server.register(summaryRoutes, { prefix: "/summary" })

server.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err
})