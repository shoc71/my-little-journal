import express from "express";
import { createPage, getOneJournal } from "../controllers/journalController.js";

const router = express.Router();

router.post("/", createPage);
router.get("/:id", getOneJournal);

export default router;