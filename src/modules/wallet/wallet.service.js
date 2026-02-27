import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getBalanceService = async (userId) => {
    const wallet = await prisma.wallet.findUnique({
        where: {
            userId
        }
    });

    if (!wallet) {
        throw new AppError({
            message: "Wallet not found",
            statusCode: 404,
            code: "WALLET_NOT_FOUND"
        });
    }

    return wallet;
}