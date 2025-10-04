import { Router } from "express";
import { createOrder,verifyPayment,getDonations,getFundraisers,createFundraiser,deleteFundraiser } from "../controller/donation.controller.js";

const router = Router();

router.post('/create-order',createOrder);
router.post('/verify-payment',verifyPayment);
router.get('/get-donations/:fundraiserId',getDonations);
router.post('/create-fundraiser',createFundraiser);
router.delete('/delete-fundraiser/:fundraiserId',deleteFundraiser);
router.get('/get-fundraisers',getFundraisers);

export default router;