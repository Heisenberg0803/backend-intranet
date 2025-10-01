const { PrismaClient } = require('../generated/prisma');
const pointsService = require('../service/pointsService');
const { getAll } = require('./newsController');
const prisma = new PrismaClient();

module.exports = {
    
    async createRegistration(req,res){
        const { eventId } = req.params;
        const {userId} = req.body;

        try{
            const lastRegister = await prisma.registration.findFirst({
                where:{ eventId: Number(eventId)},
                orderBy:{registrationId: 'desc'}
            });

            const nextNumber = lastRegister ? lastRegister.registrationId + 1 : 1;

            const registration = await prisma.registration.create({
                data:{
                    eventId: Number(eventId),
                    registrationId: nextNumber,
                    userId: Number(userId)
                }
            });
            await pointsService.addPoints(userId, 5);
            res.status(200).json(registration);
        }catch(error){
            res.status(400).json({error:'Falha ao registrar usuarios em evento'});
        }
    },

    async deleteRegistration(req, res) {
        const { eventId, registrationId } = req.params;

        try {
            await prisma.registration.delete({
                where: {
                    eventId_registrationId: {
                        eventId: Number(eventId),
                        registrationId: Number(registrationId)
                    }
                }
            });
            res.status(200).json({ message: 'Usuário retirado do evento com sucesso' });
        } catch (error) {
            res.status(400).json({ error: 'Falha ao descrever usuário do evento', details: error.message });
        }
    },

    async getAll(req,res){
        const { eventId } = req.params;

        try{
            const search = await prisma.registration.findMany({
                where:{
                    eventId: Number(eventId)
                },
                include: {
                    user: true, 
                    event: true
                }
            });
            res.status(200).json(search);
        }catch(error){
            res.status(400).json({error:'falha ao listar usuarios cadastrados no evento'});
        }
    },

    async getById(req, res) {
        const { eventId, registrationId } = req.params;

        try {
            const searchById = await prisma.registration.findUnique({
                where: {
                    eventId_registrationId: {
                        eventId: Number(eventId),
                        registrationId: Number(registrationId)
                    }
                },
                include: {
                    user: true,
                    event: true
                }
            });
            res.status(200).json(searchById);
        } catch (error) {
            res.status(400).json({ error: 'Falha ao buscar usuário registrado', details: error.message });
        }
    }
}