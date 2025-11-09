import { verifyToken } from "../middleware/jwt.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const verifyMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id, email: decoded.email }
         });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyMiddleware;
