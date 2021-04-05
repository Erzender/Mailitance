const status = (res, err) => {
  console.log("err: " + err);
  switch (err) {
    case "internal_error":
      return res.status(500).send(err);
    case "missing_parameters":
    case "invalid_parameter":
      return res.status(400).send(err);
    case "unknown_user":
    case "unknown_group":
    case "wrong_password":
    case "forbidden":
    case "no_token":
    case "invalid_token":
      return res.status(403).send(err);
    default:
      return res.status(500).send(err);
  }
};

exports.status = status;
