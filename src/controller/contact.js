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
  return res.json({ success: true });
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

exports.addContacts = addContacts;
exports.removeContacts = removeContacts;
