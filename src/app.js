import express from "express";
import { config } from "./config/config.js";
import { success } from "./utils/response.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./modules/auth/auth.routes.js";
import walletRoutes from "./modules/wallet/wallet.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    success(res, null, "Server is running", 200);
});

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);

app.use(notFoundMiddleware);
app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

export default app;