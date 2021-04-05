const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");

require("dotenv").config();
const data = require("./_model");
const db = require("./_data");
const accountCnt = require("./controller/account");
const groupCnt = require("./controller/group");
const accountService = require("./service/account");

const app = express();

app.use(cors());
app.set("secret", process.env.MAILITANCE_SECRET);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get("/build.js", (req, res) => {
  res.sendFile(__dirname + "/dist/build.js");
});

var api = express.Router();

api.post("/login", accountCnt.login);
api.use(accountCnt.checkToken);

// authenticated routes :
api.get("/", (req, res) => res.send("SUCCESS"));
api.patch("/account", accountCnt.update);
api.post("/account", accountCnt.addAccount);
api.post("/group", groupCnt.addGroup);
api.post("/groupOperators", groupCnt.addGroupOperators);
api.post("/groupMilitants", groupCnt.addGroupMilitants);

app.use("/api", api);

db.sequelize.sync().then(async () => {
  let ret = await accountService.init();
  const port = process.env.PORT || 8081;
  console.log("listening on port " + port);
  app.listen(port);
});
