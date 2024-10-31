import * as express from "express";
import * as messengerController from "../controllers/messengerController.js";
const router = express.Router();

router.get("/", messengerController.getMessages);
router.post("/", messengerController.postMessage);

export default router;
