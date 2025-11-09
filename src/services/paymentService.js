

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const userService = {

   async createPayment(id, paymentDetails) {
       try {

        const existingUser  = await prisma.user.findUnique({
            where: { id: id }
        });
        if (!existingUser) {
            return null;
        }
        const payment = await prisma.payment.create({
            data: {
                userId: id,
                ...paymentDetails
            }
        });
        return payment;
       } catch (error) {
           console.error('Error creating payment:', error);
           return null;
       }
   },

   async confirmPayment(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        if (!user) {
            return null;
        }
     const payment = await prisma.payment.findMany({
         where: { userId: id }
     });
     return payment;
    } catch (error) {
        console.error('Error confirming payment:', error);
        return null;
    }
   }

}

export default userService;
