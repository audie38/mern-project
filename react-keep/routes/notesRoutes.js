const express = require("express");
const router = express.Router();
const { getAllNotes, getNotesById, addNotes, updateNotes, deleteNotes } = require("../controllers/notesControllers");

router.route("/").get(getAllNotes).post(addNotes);
router.route("/:id").get(getNotesById).put(updateNotes).delete(deleteNotes);

module.exports = router;
