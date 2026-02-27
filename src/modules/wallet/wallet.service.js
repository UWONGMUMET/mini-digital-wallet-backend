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
};

export const depositService = async ({ userId, amount }) => {
    if (amount <= 0) {
        throw new AppError({
            message: "Invalid amount",
            statusCode: 400,
            code: "INVALID_AMOUNT"
        });
    }

    return prisma.$transaction(async (tx) => {
        const wallet = await tx.wallet.findUnique({
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

        const updateWallet = await tx.wallet.update({
            where: {
                id: wallet.id
            },
            data: {
                balance: {
                    increment: amount
                }
            }
        });

        await tx.transaction.create({
            data: {
                amount,
                walletId: updateWallet.id,
                type: "deposit",
                reference: `DEP-${Date.now()}`
            }
        });

        return updateWallet;
    })
}