import {Router} from 'express';
import { registerCentre, updateCentre, getCentreDetails, deleteCentre } from '../controller/centre.controller.js';

const router = Router();

router.post("/centrename", registerCentre);
router.put("/updatecentre/:id", updateCentre);
router.get("/allcentre", getCentreDetails);
router.delete("/deletecentre/:id", deleteCentre);

export default router;
