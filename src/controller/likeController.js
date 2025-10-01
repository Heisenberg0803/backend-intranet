const { PrismaClient } = require('../generated/prisma');
const pointsService = require('../service/pointsService');
const prisma = new PrismaClient();

module.exports = {
  // Lista likes de uma notícia
  async getLikesForNews(req, res) {
    const { newsId } = req.params;
    try {
      const likes = await prisma.like.findMany({
        where: { newsId: Number(newsId) },
        include: { user: true }
      });
      res.json(likes);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao buscar likes da notícia' });
    }
  },

  // Lista likes de um comentário
  async getLikesForComment(req, res) {
    const { newsId, commentNumber } = req.params;
    try {
      const likes = await prisma.like.findMany({
        where: { commentNewsId: Number(newsId), commentNumber: Number(commentNumber) },
        include: { user: true }
      });
      res.json(likes);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao buscar likes do comentário' });
    }
  },

  // Like em uma notícia
  async likeNews(req, res) {
    const { newsId } = req.params;
    const { userId } = req.body;

    try {
      // Impede like duplicado
      const existing = await prisma.like.findFirst({
        where: { newsId: Number(newsId), userId }
      });

      if (existing) {
        return res.status(400).json({ error: 'Usuário já curtiu esta notícia' });
      }

      const like = await prisma.like.create({
        data: { newsId: Number(newsId), userId }
      });
      await pointsService.addPoints(userId, 5);
      res.status(201).json(like);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao curtir notícia' });
    }
  },

  // Like em um comentário
  async likeComment(req, res) {
    const { newsId, commentNumber } = req.params;
    const { userId } = req.body;

    try {
      // Impede like duplicado
      const existing = await prisma.like.findFirst({
        where: {
          newsId: Number(newsId),
          commentNewsId: Number(newsId),
          commentNumber: Number(commentNumber),
          userId
        }
      });

      if (existing) {
        return res.status(400).json({ error: 'Usuário já curtiu este comentário' });
      }

      const like = await prisma.like.create({
        data: {
          commentNewsId: Number(newsId),
          commentNumber: Number(commentNumber),
          userId
        }
      });

      res.status(201).json(like);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao curtir comentário' });
    }
  },

  // Remover like de notícia
  async unlikeNews(req, res) {
    const { newsId } = req.params;
    const { userId } = req.body;

    try {
      await prisma.like.deleteMany({
        where: { newsId: Number(newsId), userId }
      });

      res.json({ message: 'Like removido da notícia' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao remover like da notícia' });
    }
  },

  // Remover like de comentário
  async unlikeComment(req, res) {
    const { newsId, commentNumber } = req.params;
    const { userId } = req.body;

    try {
      await prisma.like.deleteMany({
        where: {
          commentNewsId: Number(newsId),
          commentNumber: Number(commentNumber),
          userId
        }
      });

      res.json({ message: 'Like removido do comentário' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao remover like do comentário' });
    }
  }
};
