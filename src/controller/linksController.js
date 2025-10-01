const { PrismaClient } = require('../generated/prisma');
const { update } = require('./eventController');
const prisma = new PrismaClient();

module.exports = {

    async createLink(req,res){
        const { userId ,title,url,category } = req.body;

        try{
            const postLink = await prisma.favoriteLink.create({
                data:{
                    userId: Number(userId),
                    title: title,
                    url:url,
                    category: category
                }
            })
        }catch(error){
            res.status(400).json('Erro ao criar link')
        }
    },

    async getAll(req,res){

        try{
            const search = await prisma.favoriteLink.findMany({
                include:{author: true}
            });
            res.status(200).json(search);
        }catch(error){
            res.status(400).json('Não foi possivel postar o link');
        }
    },

    async getById(req,res){
        const { id } = req.params;
        
        try{
            const searchById = await prisma.favoriteLink.findUnique({
                where:{
                    id:Number(id)
                },
                include:{
                    author: true
                }
            });
            res.status(200).json(searchById);
        }catch(error){
            res.status(400).json('Não foi possivel achar o link');
        }
    },

    async updateLink(req,res){
        const {id} = req.params;
        const data = req.body;

        try{

            const update = await prisma.favoriteLink.update({where:{id:Number(id)},data});
            res.status(200).json(update);
        }catch(error){
            res.status(400).json({erro:'falha ao atualizar link'});
        }
    },

    async deleteLink(req,res){
        const { id } = req.params;

        try{
            await prisma.favoriteLink.delete({
                where:{id:Number(id)}
            });
            res.status(200).json('atualizado com sucesso');
        }catch(error){
            res.status(400).json({error:'falha ao deletar usuario'})
        }
    }

}