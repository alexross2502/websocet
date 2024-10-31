import * as express from "express";
import * as registrationController from "../controllers/registrationController.js";
const router = express.Router();

router.post("/", registrationController.registration);

export default router;
