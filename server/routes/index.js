import * as express from "express";
import authRouter from "./authRouter.js";
import registrationRouter from "./registrationRouter.js";
const router = express.Router();

router.use("/login", authRouter);
router.use("/registration", registrationRouter);

export default router;
