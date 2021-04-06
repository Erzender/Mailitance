const Sequelize = require("sequelize");
require("dotenv").config();

let options = {};
if (process.env.ENV !== "dev") {
  options["ssl"] = {
    require: true,
    rejectUnauthorized: false,
  };
  options["dialectOptions"] = { ssl: true };
}

const sequelize = new Sequelize(process.env.MAILITANCE_DB, options);

//sequelize.query("PRAGMA case_sensitive_like=ON;");

exports.sequelize = sequelize;
