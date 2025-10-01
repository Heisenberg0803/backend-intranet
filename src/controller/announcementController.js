const { PrismaClient } = require('../generated/prisma');
const { update, getById } = require('./eventController');
const prisma = new PrismaClient();

module.exports = {

    async createAnnouncement(req,res){
        const {title, content,importance, authorId} = req.body;

        try{
            await prisma.announcement.create({
                data:{title,content,importance,authorId}
            });
            res.status(200).json('Anuncio criado com sucesso');
        }catch(error){
            res.status(400).json({error:'Erro ao criar anuncio'});
        }
    },

    async getAll(req,res){
        try{ 
        const search = await prisma.announcement.findMany({
            include:{author: true}
        });
        res.status(200).json(search);
        }catch(error){
            res.status(400).json({error:'Erro ao realizar listagem de anuncios'})
        } 
    },

    async getById(req,res){
        const {id} = req.params;

        try{
            const searchById = await prisma.announcement.findUnique({
                where:{id:Number(id), },
                include:{author: true}
            });
            res.status(200).json(searchById);
        }catch(error){
            res.status(400).json({error: 'Falha ao buscar anuncio'})
        }

    },

    async updateAnnouncement(req,res){
        const {id} = req.params;
        const data= req.body;

        try{
            const update = await prisma.announcement.update({
                where:{id:Number(id)},
                data
            });
            res.status(200).json('Anuncio alterado com sucesso');
        }catch(error){
            res.status(400).json({error:'Erro ao alterar anuncio'});
        }
    },

    async deleteAnnouncement(req,res){
        const {id} = req.params;

        try{
            await prisma.announcement.delete({
                where:{id:Number(id)}
            });
            res.status(200).json('Anuncio deletado com sucesso');
        }catch(error){
            res.status(400).json({error:'falha ao deletar usuario'});
        }
    }

    


}