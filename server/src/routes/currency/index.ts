import * as express from "express";
import { conversion } from "../../controllers/currency";

const router = express.Router();

router.get("/conversion", conversion);

export default router;
