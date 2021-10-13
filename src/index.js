const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const fg = require('fast-glob');

require("dotenv").config();
const data = require("./_model");
const db = require("./_data");
const accountCnt = require("./controller/account");
const groupCnt = require("./controller/group");
const contactCnt = require("./controller/contact");
const accountService = require("./service/account");

const app = express();

app.use(cors());
app.set("secret", process.env.MAILITANCE_SECRET);
app.use(bodyParser.json());

app.get("/images/:image", (req, res) => {
  res.sendFile(__dirname + "/dist/images/" + req.params.image);
});

var api = express.Router();

api.post("/login", accountCnt.login);
api.use(accountCnt.checkToken);

// authenticated routes :
api.get("/", (req, res) => res.send("EN CONSTRUCTION"));

api.get("/account", accountCnt.getAll);
api.patch("/account", accountCnt.update);
api.post("/account", accountCnt.addAccount);
api.get("/account/:accountId", accountCnt.get);

api.post("/group", groupCnt.addGroup);
api.get("/group", groupCnt.getAll);
api.post("/groupOperators", groupCnt.addGroupOperators);
api.post("/groupMilitants", groupCnt.addGroupMilitants);
api.get("/group/:groupId/members", groupCnt.getGroupMembers);

api.post("/contacts", contactCnt.addContacts);
api.delete("/contacts", contactCnt.removeContacts);
api.get("/group/:groupId/contacts", contactCnt.getContacts);

app.use("/api", api);

app.use("/", express.static(path.join(__dirname ,"../app/out")));
app.get('/', (req, res) => res.sendFile(path.join(__dirname ,"../app/out/index.html")))

const files = fg.sync(["../app/out/**/*.html"], { absolute: true, cwd: __dirname });
files.forEach((file) => {
  const route = '/'+file.replace(/^.*\/out\/|\.html$/g, '').replace(/\[([a-zA-Z]*)]/g, ":$1");
  app.get(route, (req, res) => res.sendFile(file));
});

db.sequelize.sync().then(async () => {
  let ret = await accountService.init();
  const port = process.env.PORT || 8080;
  console.log("listening on port " + port);
  app.listen(port);
});
