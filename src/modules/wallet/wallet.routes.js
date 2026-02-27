import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { deposit, getBalance, withdraw } from "../../modules/wallet/wallet.controller.js";


const router = express.Router();

router.use(authMiddleware);

router.get("/balance", getBalance);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);

export default router;