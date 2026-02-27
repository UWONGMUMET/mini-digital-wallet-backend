import { success } from "../../utils/response.js";
import { AppError } from "../../utils/AppError.js";
import { getBalanceService } from "../../modules/wallet/wallet.service.js";

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
