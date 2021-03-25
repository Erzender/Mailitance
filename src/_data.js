const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.MAILITANCE_DB);

//sequelize.query("PRAGMA case_sensitive_like=ON;");

exports.sequelize = sequelize;
