const { PrismaClient } = require('../generated/prisma');
const pointsService = require('../service/pointsService');
const prisma = new PrismaClient();

module.exports = {
  // Lista todos os comentários de uma notícia
  async getAll(req, res) {
    const { newsId } = req.params;
    try {
      const comments = await prisma.comment.findMany({
        where: { newsId: Number(newsId) },
        include: { author: true, likes: true }
      });
      res.json(comments);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao buscar comentários' });
    }
  },

  // Busca um comentário específico
  async getById(req, res) {
    const { newsId, commentNumber } = req.params;
    try {
      const comment = await prisma.comment.findUnique({
        where: { 
          newsId_commentNumber:{
            newsId: Number(newsId),
            commentNumber: Number(commentNumber)
          }  
         },
        include: { author: true, likes: true }
      });
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao buscar comentário' });
    }
  },

  // Cria um comentário
 async createComment(req, res) {
  const { newsId } = req.params;
  const { text, authorId } = req.body;

  try {
    // Pega o último commentNumber da notícia
    const lastComment = await prisma.comment.findFirst({
      where: { newsId: Number(newsId) },
      orderBy: { commentNumber: 'desc' }
    });

    const nextNumber = lastComment ? lastComment.commentNumber + 1 : 1;

    const comment = await prisma.comment.create({
      data: {
        newsId: Number(newsId),
        commentNumber: nextNumber,
        newsId: Number(newsId),
        text,
        authorId
      }
    });

    await pointsService.addPoints(authorId, 5);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar comentário' });
  }
},

  // Deleta um comentário
  async deleteComment(req, res) {
    const { id } = req.params;
    try {
      await prisma.comment.delete({
        where: { id: Number(id) }
      });
      res.status(200).json({ message: 'Comentário deletado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar comentário' });
    }
  }
};
