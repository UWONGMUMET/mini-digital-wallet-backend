import { success } from "../../utils/response.js";
import { AppError } from "../../utils/AppError.js";
import { depositService, getBalanceService } from "../../modules/wallet/wallet.service.js";

export const getBalance = async (req, res, next) => {
    try {
        const { id } = req.user;
        if (!id) {
            throw new AppError({
                message: "User not found",
                statusCode: 404,
                code: "USER_NOT_FOUND"
            });
        }
        const wallet = await getBalanceService(id);
        return success(res, wallet, "Balance fetched successfully", 200);
    }
    catch (error) {
        next(error);
    }
};

export const deposit = async (req, res, next) => {
    try {
        const { id } = req.user;
        if (!id) {
            throw new AppError({
                message: "User not found",
                statusCode: 404,
                code: "USER_NOT_FOUND"
            });
        }

        const { amount } = req.body;
        if (!amount) {
            throw new AppError({
                message: "Amount is required",
                statusCode: 400,
                code: "AMOUNT_REQUIRED"
            });
        }

        const wallet = await depositService({ userId: id, amount });
        return success(res, wallet, "Deposit successful", 200);
    }
    catch (error) {
        next(error);
    }
}
