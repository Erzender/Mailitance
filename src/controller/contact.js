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

exports.addContacts = addContacts;
