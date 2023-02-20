import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
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

    },

    toogle: async function (request: FastifyRequest, reply: FastifyReply) {

        const toggleHabitParams = z.object({
            id: z.string().uuid()
        })

        const { id } = toggleHabitParams.parse(request.params)

        const today = dayjs().startOf('day').toDate()

        let day = await prisma.day.findUnique({
            where: {
                date: today
            }
        })

        if(!day) {

            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
            
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id
                }
            }
        })

        if(dayHabit) {

            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })

        }
        else {

            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id
                }
            }) 

        }      


    }

}

export default HabitController