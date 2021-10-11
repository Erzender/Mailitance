const error = require("../service/error");
const contactService = require("../service/contact");

const addContacts = async (req, res, next) => {
  let ret = await contactService.checkRightsAndAddContacts(
    req.decoded.id,
    req.body.group,
    req.body.contacts
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true, contacts: ret.contacts });
};

const removeContacts = async (req, res, newt) => {
  let ret = await contactService.checkRightsAndRemoveContacts(
    req.decoded.id,
    req.body.contacts
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true, deleted: ret.deleted });
};

const getContacts = async (req, res, next) => {
  let param = {
    age: req.query.age,
    district: req.query.district,
    voteSector: req.query.voteSector,
    topics: req.query.topics,
    voteRegistration: req.query.voteRegistration,
    help: req.query.help,
    status: req.query.status,
  };
  Object.keys(param).forEach((key) => {
    if (param[key] === undefined) {
      delete param[key];
    } else {
      param[key] = Array.isArray(param[key]) ? param[key] : [param[key]];
    }
  });
  let ret = await contactService.checkRightsAndGetContacts(
    req.decoded.id,
    req.params.groupId,
    param
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json(ret);
};

exports.addContacts = addContacts;
exports.removeContacts = removeContacts;
exports.getContacts = getContacts;
