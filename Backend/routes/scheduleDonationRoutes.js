import express from "express";
import {
  createScheduleDonation,
  getScheduleDonations,
  getSingleDonation
} from "../controllers/scheduleDonationController.js";

const router = express.Router();

// POST: create appointment
router.post("/", createScheduleDonation);

// GET: fetch all appointments
router.get("/", getScheduleDonations);

router.get('/:id', getSingleDonation);


export default router;
