const error = require("../service/error");
const groupService = require("../service/group");

const addGroup = async (req, res, next) => {
  let ret = await groupService.checkRightsAndAddGroup(
    req.decoded.id,
    req.body.title,
    req.body.parentGroup
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true, groupId: ret.group.dataValues.id });
};

const addGroupOperators = async (req, res, next) => {
  let ret = await groupService.checkRightsAndAddGroupOperators(
    req.decoded.id,
    req.body.group,
    req.body.users
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true });
};

const addGroupMilitants = async (req, res, next) => {
  let ret = await groupService.checkRightsAndAddGroupMilitants(
    req.decoded.id,
    req.body.group,
    req.body.users
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true });
};

const getAll = async (req, res, next) => {
  let ret = await groupService.getAll();
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true, groups: ret.groups });
};

const getGroupMembers = async (req, res, next) => {
  let ret = await groupService.checkRightsAndGetMembers(
    req.decoded.id,
    req.params.groupId
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json(ret);
}

exports.addGroup = addGroup;
exports.addGroupOperators = addGroupOperators;
exports.addGroupMilitants = addGroupMilitants;
exports.getAll = getAll;
exports.getGroupMembers = getGroupMembers;