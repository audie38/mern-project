const express = require("express");
const router = express.Router();
const protect = require("../middleware/authHandler");
const { getAllNotes, getNotesById, addNotes, updateNotes, deleteNotes } = require("../controllers/notesControllers");

router.use(protect);
router.route("/").get(getAllNotes).post(addNotes);
router.route("/:id").get(getNotesById).put(updateNotes).delete(deleteNotes);

module.exports = router;
