import { logger } from "../config/logger.js";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof AppError)) {
        logger.error({
            message: error.message,
            path: req.originalUrl,
            method: req.method,
            stack: error.stack
        });

        error = new AppError({
            message: "Internal server error",
            statusCode: 500,
            code: "INTERNAL_SERVER_ERROR"
        });
    }

    logger.error({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        path: req.originalUrl,
        method: req.method,
        stack: error.stack
    });

    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        code: error.code,
        details: error.details,
        timestamp: error.timestamp
    });
};