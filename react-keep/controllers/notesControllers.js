const Notes = require("../models/notes");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

// @desc Get Notes
// @route GET /api/note
// @access Public
const getAllNotes = asyncHandler(async (req, res) => {
  const query = req.query;
  const params = Object.values(query);
  let response = await Notes.findAll({
    where: { userId: req?.user?.userId },
  });
  if (params.length > 0) {
    response = await Notes.findAll({
      where: {
        [Op.and]: [
          { userId: req?.user?.userId },
          {
            [Op.or]: [
              {
                title: {
                  [Op.iLike]: `%${params[0]}%`,
                },
              },
              {
                label: {
                  [Op.iLike]: `%${params[0]}%`,
                },
              },
              {
                description: {
                  [Op.iLike]: `%${params[0]}%`,
                },
              },
            ],
          },
        ],
      },
    });
  }
  res.status(200).json({ data: response });
});

// @desc Get Notes By Id
// @route GET /api/note/:id
// @access Public
const getNotesById = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  if (!noteId) {
    return res.status(400).json({ message: "Invalid Note Id" });
  }
  const response = await Notes.findByPk(noteId);
  if (!response) {
    return res.status(404).json({ message: "Notes Not Found" });
  }
  res.status(200).json({ data: response });
});

// @desc Add New Notes
// @route POST /api/note
// @access Public
const addNotes = asyncHandler(async (req, res) => {
  const { title, label, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Fields Cannot be empty" });
  }
  const notes = await Notes.create({
    userId: req?.user?.userId,
    title: title,
    label: label?.replace(" ", "").trim(),
    description: description,
  });
  res.status(201).json({ data: notes });
});

// @desc Update Notes
// @route PUT /api/note/:id
// @access Public
const updateNotes = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  if (!noteId) {
    return res.status(400).json({ message: "Invalid Note Id" });
  }
  const existingNote = await Notes.findByPk(noteId);
  if (!existingNote) {
    return res.status(404).json({ message: "Note Not Found" });
  }
  const { title, label, description } = req.body;
  if (title) {
    existingNote.title = title;
  }
  if (label) {
    existingNote.label = label.replace(" ", "").trim();
  }
  if (description) {
    existingNote.description = description;
  }
  await existingNote.save();
  res.status(200).json({ message: "Note Updated" });
});

// @desc Delete Notes
// @route DELETE /api/note/:id
// @access Public
const deleteNotes = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  if (!noteId) {
    return res.status(400).json({ message: "Invalid Note Id" });
  }
  const existingNote = await Notes.findByPk(noteId);
  if (!existingNote) {
    return res.status(404).json({ message: "Note Not Found" });
  }
  await existingNote.destroy();
  res.status(200).json({ message: "Note Deleted" });
});

module.exports = {
  getAllNotes,
  getNotesById,
  addNotes,
  updateNotes,
  deleteNotes,
};
