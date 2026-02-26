import { verifyAccessToken } from "../utils/jwt.js";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError({
                message: "Authorization header missing or invalid",
                statusCode: 401,
                code: "UNAUTHORIZED"
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: {
                wallet: true
            }
        });

        if (!user) {
            throw new AppError({
                message: "User not found",
                statusCode: 404,
                code: "USER_NOT_FOUND"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}