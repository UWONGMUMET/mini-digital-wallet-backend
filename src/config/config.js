import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT,
    jwt: {
        access: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        }
    },
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
    rateLimit: {
        global: {
            windowMs: Number(process.env.GLOBAL_RATE_LIMIT_WINDOW_MS),
            max: Number(process.env.GLOBAL_RATE_LIMIT_MAX)
        },
        auth: {
            windowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS),
            max: Number(process.env.AUTH_RATE_LIMIT_MAX)
        }
    },
    logger: {
        level: process.env.LOG_LEVEL,
        dir: process.env.LOG_DIR
    },
    nodeEnv: process.env.NODE_ENV
}