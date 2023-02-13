import {  FastifyRequest, FastifyReply } from 'fastify'
import {  z } from 'zod'
import dayjs from "dayjs"
import { prisma } from '../lib/prisma'

const HabitController = {

    create: async function (request: FastifyRequest, reply: FastifyReply) {

        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })

        const { title, weekDays } = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => ({ week_day: weekDay }))
                }
            }
        })

    }

}

export default HabitController