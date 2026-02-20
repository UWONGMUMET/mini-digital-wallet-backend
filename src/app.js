import express from "express";
import { config } from "./config/config.js";
import { success } from "./utils/response.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    success(res, null, "Server is running", 200);
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

export default app;