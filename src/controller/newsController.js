const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

module.exports = {
  async getAll(req, res) {
    const news = await prisma.news.findMany({
      include: { author: true, comments: true, likes: true }
    });
    res.json(news);
  },

  async getById(req, res) {
    const { id } = req.params;
    const item = await prisma.news.findUnique({
      where: { id: Number(id) },
      include: { author: true, comments: true, likes: true }
    });
    if (!item) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json(item);
  },

  async create(req, res) {
    console.log('REQ BODY: ', req.body);
    const { title, content, authorId, status } = req.body;
    const news = await prisma.news.create({ data: { title, content, authorId, status } });
    res.status(201).json(news);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const updated = await prisma.news.update({
        where: { id: Number(id) },
        data
      });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar notícia' });
    }
  },

  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.news.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar notícia' });
    }
  }
};