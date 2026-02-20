import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "./config.js";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const prodFormat = json();

const transports = [
    new winston.transports.Console({
        format: combine(
            colorize(),
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            errors({ stack: true }),
            devFormat
        )
    }),

    new DailyRotateFile({
        filename: `${config.logger.dir}/app-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        level: "info",
        maxFiles: "14d"
    }),

    new DailyRotateFile({
        filename: `${config.logger.dir}/error-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        level: "error",
        maxFiles: "30d"
    })
];

export const logger = winston.createLogger({
    level: config.logger.level,
    levels,
    format: combine(
        timestamp(),
        errors({ stack: true }),
        config.nodeEnv === "development" ? devFormat : prodFormat
    ),
    transports
});