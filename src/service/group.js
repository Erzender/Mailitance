const data = require("../_model");
const accountService = require("./account");

const checkRightsAndAddGroup = async (actor, groupTitle, parentGroupId) => {
  let isAdmin = await accountService.checkAdmin(actor);
  if (isAdmin.error) return isAdmin;
  if (!groupTitle) return { error: "missing_parameter" };
  try {
    let parentGroup = null;
    if (parentGroupId) {
      parentGroup = await data.Group.findByPk(parentGroupId);
      if (!parentGroup) return { error: "unknown_group" };
    }
    let newGroup = await data.Group.create({ title: groupTitle });
    if (parentGroup) {
      await newGroup.setParentGroup(parentGroup);
    }
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

exports.checkRightsAndAddGroup = checkRightsAndAddGroup;
