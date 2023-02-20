import {  FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import dayjs from "dayjs"
import { prisma } from '../lib/prisma'

const SummaryController = {

    index: async function (request: FastifyRequest, reply: FastifyReply) {

        const summary = await prisma.$queryRaw`
            SELECT 
                D.id, 
                D.date,
                (SELECT CAST(COUNT(*) AS float) FROM day_habits DH WHERE DH.day_id = D.id) AS completed,
                (SELECT CAST(COUNT(*) AS float) FROM habit_week_days HWD JOIN habits H ON H.id = HWD.habit_id WHERE HWD.week_day = CAST(STRFTIME('%w', D.date / 1000.0, 'unixepoch') AS int) AND H.created_at <= D.date) AS amount
            FROM days D            
        `

        return summary

    }

}

export default SummaryController