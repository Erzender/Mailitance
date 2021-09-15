const jwt = require("jsonwebtoken");
const error = require("../service/error");
const accountService = require("../service/account");

const checkToken = (req, res, next) => {
  var token = (req.body && req.body.token) || req.headers["x-access-token"];

  if (!token) {
    return error.status(res, "no_token");
  }
  try {
    var decoded = jwt.verify(token, req.app.get("secret"));
  } catch (err) {
    return error.status(res, "invalid_token");
  }
  req.decoded = decoded;
  next();
};

const login = async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return error.status(res, "missing_parameters");
  }
  var ret = await accountService.login(req.body.username, req.body.password);
  if (ret.error) {
    return error.status(res, ret.error);
  }
  var token = jwt.sign({ id: ret.user.dataValues.id }, req.app.get("secret"), {
    expiresIn: 86400 // expires in 24 hours
  });
  return res.json({ success: true, token: token });
};

const update = async (req, res) => {
  if (!req.body.id) {
    return error.status(res, "missing_parameters");
  }
  let ret = await accountService.update(req.decoded.id, req.body);
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true });
};

const addAccount = async (req, res) => {
  let ret = await accountService.checkRightsAndAddAccount(
    req.decoded.id,
    req.body.username,
    req.body.password
  );
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true, userId: ret.user.dataValues.id });
};

const get = async (req, res) => {
  let ret = await accountService.get(req.decoded.id, req.params.accountId);
  if (!!ret.error) {
    return error.status(res, ret.error);
  }
  return res.json({ success: true, user: ret });
};

exports.checkToken = checkToken;
exports.login = login;
exports.update = update;
exports.addAccount = addAccount;
exports.get = get;
