const Op = require("sequelize").Op;
const data = require("../_model");
const accountService = require("./account");

const checkRightsAndAddGroup = async (actor, groupTitle, parentGroupId) => {
  let isAdmin = await accountService.checkAdmin(actor);
  let group = null;
  if (isAdmin.error) return isAdmin;
  if (!groupTitle) return { error: "missing_parameter" };
  try {
    let parentGroup = null;
    if (parentGroupId) {
      parentGroup = await data.Group.findByPk(parentGroupId);
      if (!parentGroup) return { error: "unknown_group" };
    }
    group = await data.Group.create({ title: groupTitle });
    if (parentGroup) {
      await group.setParentGroup(parentGroup);
    }
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false, group };
};

const checkRightsAndAddGroupOperators = async (actor, groupId, usersParam) => {
  let isAdmin = await accountService.checkAdmin(actor);
  if (isAdmin.error) return isAdmin;
  if (!groupId || !Array.isArray(usersParam) || usersParam.length === 0)
    return { error: "missing_parameter" };
  try {
    let users = await data.User.findAll({
      where: { id: { [Op.in]: usersParam } },
    });
    if (users.length < usersParam.length) return { error: "unknown_user" };
    let group = await data.Group.findByPk(groupId);
    if (!group) return { error: "unknown_group" };
    await group.addUsers(users, { through: "GroupOperator" });
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

exports.checkRightsAndAddGroup = checkRightsAndAddGroup;
exports.checkRightsAndAddGroupOperators = checkRightsAndAddGroupOperators;
