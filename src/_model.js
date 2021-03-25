const Sequelize = require("sequelize");
const db = require("./_data");

const User = db.sequelize.define("user", {
  username: {
    unique: true,
    type: Sequelize.STRING,
  },
  displayname: Sequelize.STRING,
  password: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
});

const Group = db.sequelize.define("group", {
  title: Sequelize.STRING,
});

const Contact = db.sequelize.define("contact", {
  lastname: Sequelize.STRING,
  firstname: Sequelize.STRING,
  age: Sequelize.INTEGER, // /!\ code => 16 => [16;25], 26 => [26;35], 36 => [36;50], 51 => [51;62], 62 => [62;inf]
  address: Sequelize.STRING,
  district: Sequelize.STRING,
  voteSector: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  topics: Sequelize.TEXT,
  voteRegistration: Sequelize.BOOLEAN,
  help: Sequelize.BOOLEAN,
  appreciation: Sequelize.TEXT,
  status: Sequelize.INTEGER, // code => 0 => neutre, 1 => sympathisant, 2 => militant, 3 => organisateur
});

Contact.belongsTo(Group);
Group.belongsTo(Group, { as: "ParentGroup" });
User.belongsToMany(Group, { through: "GroupOperator" });
Group.belongsToMany(User, { through: "GroupOperator" });
User.belongsToMany(Group, { through: "GroupMilitant" });
Group.belongsToMany(User, { through: "GroupMilitant" });

exports.User = User;
exports.Group = Group;
exports.Contact = Contact;
