const Sequelize = require("sequelize");
const db = require("./_data");

const User = db.sequelize.define(
  "user",
  {
    username: {
      unique: true,
      type: Sequelize.STRING
    },
    displayName: Sequelize.STRING,
    password: Sequelize.STRING,
    admin: Sequelize.BOOLEAN
  },
  {
    getterMethods: {
      formattedUser() {
        return {
          id: this.id,
          admin: this.admin,
          username: this.username,
          displayName: this.displayName
        };
      }
    }
  }
);

const Group = db.sequelize.define("group", {
  title: Sequelize.STRING,
  level: Sequelize.INTEGER
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
  help: { type: Sequelize.BOOLEAN, defaultValue: false },
  status: Sequelize.INTEGER, // code => 0 => neutre, 1 => sympathisant, 2 => militant, 3 => organisateur
  rgpdConsent: { type: Sequelize.BOOLEAN, defaultValue: false },
  detail: Sequelize.TEXT,
  comment: Sequelize.TEXT
});

Contact.belongsTo(Group);
Group.belongsTo(Group, { as: "ParentGroup" });
User.belongsToMany(Group, { as: "OperatingGroups", through: "GroupOperators" });
Group.belongsToMany(User, { as: "Operators", through: "GroupOperators" });
User.belongsToMany(Group, { as: "MilitantGroups", through: "GroupMilitants" });
Group.belongsToMany(User, { as: "Militants", through: "GroupMilitants" });

exports.User = User;
exports.Group = Group;
exports.Contact = Contact;
