const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

module.exports ={

    async addPoints(userId,amount){
        await prisma.user.update({
            where:{ 
                id: Number(userId),
            },
            data: {
                points:{ increment: amount}
            }
        });
    }
};