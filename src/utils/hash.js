import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import { AppError } from "../utils/AppError.js";

export const hashPassword = async (plainPassword) => {
    if (!plainPassword) {
        throw new AppError({
            message: "Password is required",
            statusCode: 400,
            code: "MISSING_PASSWORD"
        });
    }

    return bcrypt.hash(plainPassword, config.saltRounds);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    if (!plainPassword || !hashedPassword) {
        throw new AppError({
            message: "Password is required",
            statusCode: 400,
            code: "MISSING_PASSWORD"
        });
    }

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isMatch) {
        throw new AppError({
            message: "Invalid password",
            statusCode: 401,
            code: "INVALID_PASSWORD"
        });
    }

    return isMatch;
}