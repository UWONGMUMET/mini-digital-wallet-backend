export class AppError extends Error {
    constructor({ message, statusCode = 500, code = "INTERNAL_ERROR", details = null }) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.timestamp = new Date().toISOString();

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            code: this.code,
            details: this.details,
            timestamp: this.timestamp
        };
    }
}