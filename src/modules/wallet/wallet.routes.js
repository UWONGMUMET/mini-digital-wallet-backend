import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getBalance } from "../../modules/wallet/wallet.controller.js";


const router = express.Router();

router.use(authMiddleware);
router.get("/balance", getBalance);

export default router;