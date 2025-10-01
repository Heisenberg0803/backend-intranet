require('dotenv').config();
const { PrismaClient } = require('../back_end/src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
    const password_hash = await bcrypt.hash('Admin123', 10);
    const name = 'Admin';
    const last_name = 'Falavinha';
    const email = 'admin@falavinha.com.br';
    const department = 'TI';
    const phones = {}
    const company_history = 'Administrador da intranet';
    const points  = 100000;

    try {
        const admin = await prisma.user.create({
            data: {
                name,
                last_name,
                email,
                password_hash,
                department,
                phones,
                company_history,
                points,
                role: 'ADMIN'
            }
        });
        console.log('Usuário admin criado com sucesso:', admin);
    } catch (e) {
        console.error('Erro ao criar usuário admin:', e);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();