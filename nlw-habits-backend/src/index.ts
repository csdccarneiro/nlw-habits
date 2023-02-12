import fastify from "fastify";
import cors from "@fastify/cors";
import habitRoutes from "./routes/habit"

const server = fastify({ logger: true })

server.register(cors)

server.register(habitRoutes, { prefix: "/habits" })

server.listen({ port: 3333 }, (err, address) => {
    if (err) throw err
})