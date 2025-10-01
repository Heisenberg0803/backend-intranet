const { PrismaClient } = require("../generated/prisma")

const prisma = new PrismaClient();

module.exports = {

    async getAll(req ,res){
        const users = await prisma.user.findMany();
        res.json(users);
    },

    async getById(req, res){
        const { id } = req.params;
        const user = await prisma.user.findUnique({where : {id: Number(id) } } );

        if(!user) return res.status(404).json({error: 'usuario não encontrado'});
        res.json(user);
    },

    async creatUser(req, res){
        const {name, last_name,department,company_history,password_hash,email,phone,role,points, profile_image} = req.body;
       try{
            const user = await prisma.user.create({
            data: { name, last_name, email, password_hash, department,phone,company_history,profile_image,role,points }
        });
            res.status(201).json(user);

       }catch(error){
        res.status(400).json("Não foi possivel criar o usuario");
       }
    },

    async updateUser(req, res){
        const { id } = req.params;
        const data = req.body;

        try{
            const updated = await prisma.user.update({ where: { id: Number(id) }, data });
            res.json(updated);
        }catch(error){
            res.status(400).json({ error: 'Erro ao atualizar usuario' });
        }
    },

    async deleteUser(req, res){
        const { id } = req.params;
        try{
            await prisma.user.delete({where: { id:Number(id) }, });
            res.status(200).json("Usuario deletado com sucesso");
        }catch(error){
            res.status(400).json({error:'Não foi possivel deletar o usuario ??'});
        }
    },


    login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: { username, is_active: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Aqui compara senha (supondo que esteja criptografada com bcrypt)
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // remove campo password antes de mandar
      const { password: _, ...userWithoutPass } = user;

      return res.json(userWithoutPass);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Login failed" });
    }
  },


}