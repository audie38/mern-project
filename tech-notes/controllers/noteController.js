const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// @desc GET all Notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  let notes = [];
  if (userId) {
    notes = await Note.find({ user: userId }).lean();
  } else {
    notes = await Note.find().lean();
  }

  if (!notes.length > 0) {
    return res.status(404).json({ message: "No Notes Found" });
  }

  res.status(200).json(notes);
});

// @desc GET Note
// @route GET /notes/:id
// @access Private
const getNoteById = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  if (!noteId) {
    return res.status(400).json({ message: "NoteId Required" });
  }
  const note = await Note.findById(noteId).lean();
  if (!note) {
    return res.status(404).json({ message: "No Note Found" });
  }
  res.status(200).json(note);
});

// @desc Create Note
// @route POST /notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  const userId = new mongoose.Types.ObjectId(user);
  const validUser = await User.findOne(userId).lean().exec();
  if (!validUser) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const note = await Note.create({ user, title, text });
  if (note) {
    res.status(201).json({ message: "New Note Created" });
  } else {
    res.status(400).json({ message: "Invalid Note Data Received" });
  }
});

// @desc Update Note
// @route PUT /notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const { user, title, text } = req.body;
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  const userId = new mongoose.Types.ObjectId(user);
  const validUser = await User.findOne(userId).lean().exec();
  if (!validUser) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const note = await Note.findById(noteId).exec();
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.title = title;
  note.text = text;

  await note.save();
  res.status(200).json({ message: "Note Updated" });
});

// @desc Delete Note
// @route DELETE /notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  if (!noteId) {
    return res.status(400).json({ message: "Invalid NoteId" });
  }

  const note = await Note.findById(noteId).exec();
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();
  const message = `Note with title ${result.title} deleted`;
  res.status(200).json(message);
});

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
