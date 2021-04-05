const bcrypt = require("bcrypt");
const data = require("../_model");

const addAccount = async (username, password, admin) => {
  if (!password || !username) {
    return { error: "missing_parameter" };
  }
  let user = null;
  try {
    let hash = await bcrypt.hash(password, 10);
    user = await data.User.create({
      password: hash,
      username,
      displayName: username,
      admin: !!admin,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return { error: "unavailable_username" };
    }
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false, user };
};

const checkAdmin = async (userId) => {
  try {
    let user = await data.User.findByPk(userId);
    if (!user.admin) {
      return { error: "forbidden" };
    }
    return { error: false };
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
};

const checkOperator = async (userId, groupId = null) => {
  let user = await data.User.findByPk(userId);
  let groups = await user.getOperatingGroups();
  if (
    groups.length === 0 ||
    (groupId !== null &&
      !groups.map((group) => group.dataValues.id).includes(groupId))
  ) {
    return checkAdmin(userId);
  }
  return { error: false };
};

const checkMilitant = async (userId, groupId = null) => {
  let user = await data.User.findByPk(userId);
  let groups = await user.getMilitantGroups();
  if (
    groups.length === 0 ||
    (groupId !== null &&
      !groups.map((group) => group.dataValues.id).includes(groupId))
  ) {
    return checkOperator(userId, groupId);
  }
  return { error: false };
};

const checkRightsAndAddAccount = async (userId, username, password) => {
  let isAdmin = await checkAdmin(userId);
  if (isAdmin.error) {
    let isOperator = await checkOperator(userId);
    if (isOperator.error) return isAdmin;
  }
  return await addAccount(username, password, false);
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

const update = async (actor, newValues) => {
  try {
    let user = await data.User.findByPk(actor);
    let targetUser = await data.User.findByPk(newValues.id);

    if (!user || !targetUser) {
      return { error: "unknown_user" };
    }
    if (user.dataValues.id !== targetUser.dataValues.id && !user.admin) {
      return { error: "forbidden" };
    }

    let change = {};

    if ((!!newValues.admin || !!newValues.username) && !user.dataValues.admin) {
      return { error: "forbidden" };
    }
    if (!!newValues.password && !user.dataValues.admin) {
      if (!newValues.previousPassword) {
        return { error: "missing_parameters" };
      }
      let loggedIn = await login(
        user.dataValues.username,
        newValues.previousPassword
      );
      if (loggedIn.error) {
        return loggedIn;
      }
    }
    if (!!newValues.password) {
      var hash = await bcrypt.hash(newValues.password, 10);
      change["password"] = hash;
    }
    if (newValues.admin !== undefined) change["admin"] = newValues.admin;
    if (!!newValues.username) change["username"] = newValues.username;
    if (!!newValues.displayName) change["displayName"] = newValues.displayName;

    await targetUser.update(change);
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

exports.addAccount = addAccount;
exports.login = login;
exports.init = init;
exports.update = update;
exports.checkAdmin = checkAdmin;
exports.checkOperator = checkOperator;
exports.checkMilitant = checkMilitant;
exports.checkRightsAndAddAccount = checkRightsAndAddAccount;
