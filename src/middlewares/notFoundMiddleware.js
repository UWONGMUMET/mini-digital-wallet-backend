import { AppError } from "../utils/AppError.js";

export const notFoundMiddleware = (req, res, next) => {
    next(
        new AppError({
            message: `Route ${req.method} ${req.originalUrl} not found`,
            statusCode: 404,
            code: "ROUTE_NOT_FOUND",
            details: {
                path: req.originalUrl,
                method: req.method
            }
        })
    );
};