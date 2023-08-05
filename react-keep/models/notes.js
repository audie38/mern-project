const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Notes = sequelize.define("notes", {
  notesId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  label: Sequelize.STRING,
  description: Sequelize.TEXT,
});

module.exports = Notes;
