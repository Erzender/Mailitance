const Op = require("sequelize").Op;
const data = require("../_model");
const accountService = require("./account");

const checkRightsAndAddGroup = async (actor, groupTitle, parentGroupId) => {
  let isAdmin = await accountService.checkAdmin(actor);
  let group = null;
  if (isAdmin.error) return isAdmin;
  if (!groupTitle) return { error: "missing_parameters" };
  try {
    let parentGroup = null;
    let level = 0;
    if (parentGroupId) {
      parentGroup = await data.Group.findByPk(parentGroupId);
      if (!parentGroup) return { error: "unknown_group" };
      level = parentGroup.dataValues.level + 1;
    }
    group = await data.Group.create({
      title: groupTitle,
      level
    });
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
    return { error: "missing_parameters" };
  try {
    let users = await data.User.findAll({
      where: { id: { [Op.in]: usersParam } }
    });
    if (users.length < usersParam.length) return { error: "unknown_user" };
    let group = await data.Group.findByPk(groupId);
    if (!group) return { error: "unknown_group" };
    await group.addOperators(users);
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

const checkRightsAndAddGroupMilitants = async (actor, groupId, usersParam) => {
  let isOperator = await accountService.checkOperator(actor, groupId);
  if (isOperator.error) return isOperator;
  if (!groupId || !Array.isArray(usersParam) || usersParam.length === 0)
    return { error: "missing_parameters" };
  try {
    let users = await data.User.findAll({
      where: { id: { [Op.in]: usersParam } }
    });
    if (users.length < usersParam.length) return { error: "unknown_user" };
    let group = await data.Group.findByPk(groupId);
    if (!group) return { error: "unknown_group" };
    await group.addMilitants(users);
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

const checkRightsAndGetMembers = async (userId, groupId) => {
  if (!groupId)
    return { error: "missing_parameters" };
  let isAdmin = await accountService.checkAdmin(userId);
  if (isAdmin.error) {
    let isOperator = await accountService.checkOperator(userId, groupId);
    if (isOperator.error) return isOperator;
  }

  try {
    const militants = await data.User.findAll({
      include: {
        model: data.Group,
        as: 'MilitantGroups',
        required: true,
        where: {
          id: groupId
        }
      }
    });
    const operators = await data.User.findAll({
      include: {
        model: data.Group,
        as: 'OperatingGroups',
        required: true,
        where: {
          id: groupId
        }
      }
    });
    return { success: true, militants, operators }
  } catch(err) {
    console.error(err);
    return { error: "internal_error" };
  }
}

const getSubGroupsIds = async group => {
  let groups = [group.dataValues.id];
  let level = group.dataValues.level;
  let newGroups = [null];
  while (newGroups.length > 0) {
    level += 1;
    newGroups = await data.Group.findAll({
      where: { [Op.and]: { level, ParentGroupId: { [Op.in]: groups } } }
    });
    groups = groups.concat(newGroups.map(grp => grp.dataValues.id));
  }
  return groups;
};

const getAll = async () => {
  try {
    let groups = await data.Group.findAll();
    return {
      groups: groups.map(group => ({
        id: group.dataValues.id,
        title: group.dataValues.title,
        level: group.dataValues.level,
        parent: group.dataValues.ParentGroupId
      }))
    };
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

const getMembers = async (groupId) => {

}

exports.checkRightsAndAddGroup = checkRightsAndAddGroup;
exports.checkRightsAndAddGroupOperators = checkRightsAndAddGroupOperators;
exports.checkRightsAndAddGroupMilitants = checkRightsAndAddGroupMilitants;
exports.checkRightsAndGetMembers = checkRightsAndGetMembers;
exports.getSubGroupsIds = getSubGroupsIds;
exports.getAll = getAll;
