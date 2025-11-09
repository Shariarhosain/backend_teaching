

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import {generateToken}  from '../middleware/jwt.js';

const userService = {

    async getAllUsers() {
        return await prisma.user.findMany();
    },

    async createUser(data,file) {

         const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
         });

         if (existingUser) {
             return null;
         }
        

        const newUser = await prisma.user.create({
            data
        });
        
        setImmediate( async() =>  {
            if(file){
                console.log(file);
                file.path = file.path.replace(/\\/g, "/");
                const profile_pic = 'http://localhost:3000/' + file.path;

                await prisma.user.update({
                    where: { email: data.email },
                    data: {
                        profile_pic: profile_pic
                    }
                });
            }
        });

        return newUser;
    },

    async updateUser(email, data) {
      const existingUser = await prisma.user.findUnique({
            where: { email }
         });
            if (!existingUser) {
                return null;
            }
            return await prisma.user.update({
                where: { email },
                data
            });
    },

    async deleteUser(email) {

        const existingUser = await prisma.user.findUnique({
            where: { email }
         });
         if (!existingUser) {
             return null;
         }
        const deletedUser =  await prisma.user.delete({
             where: { email }
         });
         return deletedUser;
    },

    async  login(email,password) {
        const user  = await prisma.user.findUnique({
            where: { email , password }
         });
  if(!user){
    return null;
  }
  const token = generateToken(user);
  
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
    },

    async getUserById(id) {

        const existingUser = await prisma.user.findUnique({
            where: { id }
         });
         if (!existingUser) {
             return null;
         }
         return existingUser;
        

    },



}

export default userService;
