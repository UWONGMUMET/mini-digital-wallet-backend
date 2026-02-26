import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { AppError } from "../utils/AppError.js";

export const generateAccessToken = (payload) => {
    if (!payload || typeof payload !== "object") {
        throw new AppError({
            message: "Invalid token payload",
            statusCode: 400,
            code: "INVALID_TOKEN_PAYLOAD"
        });
    }

    return jwt.sign(
        payload,
        config.jwt.access.secret,
        {
            expiresIn: config.jwt.access.expiresIn
        }
    );
};

export const verifyAccessToken = (token) => {
    if (!token) {
        throw new AppError({
            message: "Access token is required",
            statusCode: 401,
            code: "MISSING_ACCESS_TOKEN"
        });
    }

    try {
        return jwt.verify(token, config.jwt.access.secret);
    } catch (error) {
        throw new AppError({
            message: "Invalid access token",
            statusCode: 401,
            code: "INVALID_ACCESS_TOKEN"
        });
    };
};

export const generateRefreshToken = (payload) => {
    if (!payload || typeof payload !== "object") {
        throw new AppError({
            message: "Invalid token payload",
            statusCode: 400,
            code: "INVALID_TOKEN_PAYLOAD"
        })
    }

    return jwt.sign(
        payload,
        config.jwt.refresh.secret,
        {
            expiresIn: config.jwt.refresh.expiresIn
        }
    );
};

export const verifyRefreshToken = (token) => {
    if (!token) {
        throw new AppError({
            message: "Refresh token is required",
            statusCode: 401,
            code: "MISSING_REFRESH_TOKEN"
        });
    }

    try {
        return jwt.verify(token, config.jwt.refresh.secret);
    } catch (error) {
        throw new AppError({
            message: "Invalid refresh token",
            statusCode: 401,
            code: "INVALID_REFRESH_TOKEN"
        });
    }
};