const bcrypt = require("bcrypt");
const data = require("../_model");

const addAccount = async (username, password, admin) => {
  if (!password || !username) {
    return { error: "missing_parameter" };
  }
  try {
    var hash = await bcrypt.hash(password, 10);
    var user = await data.User.create({
      password: hash,
      username,
      displayname: username,
      admin: !!admin,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return { error: "unavailable_username" };
    }
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

const login = async (username, password) => {
  if (!username || !password) {
    return { error: "missing_parameter" };
  }
  try {
    var user = await data.User.findOne({ where: { username } });
    if (user === null) {
      return { error: "unknown_user" };
    }
    var compare = await bcrypt.compare(password, user.password);
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  if (!compare) {
    return { error: "wrong_password" };
  }
  return { error: false, user };
};

const init = async () => {
  try {
    let admin = await data.User.findOne({
      where: { username: "admin" },
    });
    if (!admin) {
      return await addAccount("admin", "admin", true);
    }
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

exports.addAccount = addAccount;
exports.login = login;
exports.init = init;
