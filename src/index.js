
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('./generated/prisma');
require('dotenv').config();

const newsRoutes = require('./routes/newsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const linksRoutes = require('./routes/linkRoutes');

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json);

app.get("/proxy", async (req, res) => {
  try {
    const r = await fetch("https://dlnk.one/e?id=bjyERE3DxNAm&type=1");
    const data = await r.text(); // ou .json() se for JSON
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
// Rotas
app.use('/news', newsRoutes);
app.use('/events', eventRoutes);
app.use('/user', userRoutes);
app.use('/', commentRoutes);
app.use('/', likeRoutes);
app.use('/announcement',announcementRoutes);
app.use('/', registrationRoutes);
app.use('/links', linksRoutes);

// Health-check básico
app.get('/', (req, res) => res.send('Intranet v1.0 API rodando'));

