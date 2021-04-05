const data = require("../_model");
const accountService = require("./account");

const CONTACT_AGES = [16, 26, 36, 51, 62];
const CONTACT_STATUSES = [
  0, // neutre
  1, // sympathisant
  2, // militant
  3, // organisateur
];

const checkRightsAndAddContacts = async (userId, groupId, contacts) => {
  try {
    if (!groupId || !Array.isArray(contacts) || contacts.length === 0)
      return { error: "missing_parameter" };
    let invalidContacts = contacts.filter((contact) => {
      if (!contact.email && !contact.phone) return true;
      if (contact.age && !CONTACT_AGES.includes(contact.age)) return true;
      console.log("hello");
      if (contact.status && !CONTACT_STATUSES.includes(contact.status))
        return true;
      if (contact.topics && !Array.isArray(contact.topics)) return true;
    });
    if (invalidContacts.length > 0) {
      return { error: "invalid_parameter" };
    }
    let user = await data.User.findByPk(userId);
    if (!user) return { error: "unknown_user" };
    let group = await data.Group.findByPk(groupId);
    if (!group) return { error: "unknown_group" };
    let isMilitant = await accountService.checkMilitant(userId, groupId);
    if (isMilitant.error) return isMilitant;

    for (let contactParam of contacts) {
      let contact = await data.Contact.create({
        ...contactParam,
        topics: JSON.stringify(contactParam.topics),
      });
      await contact.setGroup(group);
    }
  } catch (err) {
    console.error(err);
    return { error: "internal_error" };
  }
  return { error: false };
};

exports.checkRightsAndAddContacts = checkRightsAndAddContacts;
