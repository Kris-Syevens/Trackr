import express from "express";
import testUser from "../middleware/testUser.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";

const router = express.Router();

// JOB ROUTES
router.route("/").post(testUser, createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
