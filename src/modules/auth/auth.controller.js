import { AppError } from "../../utils/AppError.js";
import { success } from "../../utils/response.js";
import { registerService, loginService } from "./auth.service.js";

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError({
                message: "Email and password are required",
                statusCode: 400,
                code: "MISSING_EMAIL_OR_PASSWORD"
            });
        }

        const user = await registerService({ email, password });
        return success(res, { id: user.id, email: user.email }, "User registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError({
                message: "Email and password are required",
                statusCode: 400,
                code: "MISSING_EMAIL_OR_PASSWORD"
            });
        }
        const { accessToken, refreshToken } = await loginService({ email, password });
        return success(res, { accessToken, refreshToken }, "User logged in successfully", 200);
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AppError({
                message: "Refresh token is required",
                statusCode: 400,
                code: "MISSING_REFRESH_TOKEN"
            });
        }
        
        const token = await refreshTokenService({ refreshToken });
        return success(res, token, "Token refreshed successfully", 200);
    } catch (error) {
        next(error);
    }
};