import * as express from "express";
import authRouter from "./authRouter.js";
import registrationRouter from "./registrationRouter.js";
import messengerRouter from "./messengerRouter.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use("/login", authRouter);
router.use("/registration", registrationRouter);
router.use("/messenger", authenticate, messengerRouter);

export default router;
