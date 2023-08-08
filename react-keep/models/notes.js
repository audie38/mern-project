const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Users = require("./users");

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

Notes.belongsTo(Users, { constraints: true, onDelete: "CASCADE", foreignKey: "userId", targetKey: "userId" });
Users.hasMany(Notes, { foreignKey: "userId", sourceKey: "userId" });

module.exports = Notes;
