const { PrismaClient } = require('../generated/prisma');
const pointsService = require('../service/pointsService');
const prisma = new PrismaClient();

module.exports = {
  async getAll(req,res) {
    const events = await prisma.event.findMany({
      include: { organizer: true, registrations: true }
    });
    res.json(events);
  },

  async getById(req, res) {
    const { id } = req.params;
    const item = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { organizer: true, registrations: true }
    });
    if (!item) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(item);
  },

  async create(req, res) {
    const { title, description, dateTime, location, organizerId,start_date,end_date } = req.body;

    const event = await prisma.event.create({ data: { title, description, dateTime: new Date(dateTime), location, organizerId } });
    await pointsService.addPoints(organizerId, 10);
    res.status(201).json(event);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (data.dateTime) data.dateTime = new Date(data.dateTime);
    try {
      const updated = await prisma.event.update({ where: { id: Number(id) }, data });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar evento' });
    }
  },

  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.event.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar evento' });
    }
  }
};