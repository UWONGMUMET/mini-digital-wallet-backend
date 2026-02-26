import { config } from "../../config/config.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import ms from "ms";

export const registerService = async ({ email, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new AppError({
            message: "User already exists",
            statusCode: 400,
            code: "USER_ALREADY_EXISTS"
        });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        await tx.wallet.create({
            data: {
                userId: newUser.id
            }
        });

        return newUser;
    });

    return {
        id: user.id,
        email: user.email
    }
};

export const loginService = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new AppError({
            message: "User not found",
            statusCode: 404,
            code: "USER_NOT_FOUND"
        });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new AppError({
            message: "Invalid password",
            statusCode: 401,
            code: "INVALID_PASSWORD"
        });
    };

    const accessToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ id: user.id, email: user.email });

    const expiresAt = new Date(
        Date.now() + ms(config.jwt.refresh.expiresIn)
    );

    const hashedRefreshToken = await hashPassword(refreshToken);
    await prisma.refreshToken.create({
        data: {
            token: hashedRefreshToken,
            userId: user.id,
            expiresAt
        }
    });

    return {
        accessToken,
        refreshToken
    }
}