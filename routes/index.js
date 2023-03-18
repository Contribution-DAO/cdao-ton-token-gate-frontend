const router = require("./router");
const detail = require("./detail");
const request = require("request");
/* GET home page. */
router.get("/", function (req, res, next) {
  let paramsend = {
    views: "home.ejs",
  };
  const options = {
    uri: `https://ton-core.contributiondao.com/telegram/groups`,
    method: `GET`,
    contentType: "application/json",
    // headers: {
    //   Authorization: `${stsconfig.authorizationkey}`,
    // },
  };
  request(options, (req, ress) => {
    let data = ress.body ? ress.body : null;
    let alldata = JSON.parse(data);
    paramsend = {
      ...paramsend,
      alldata,
    };
    res.render(`index.ejs`, paramsend);
  });
});
router.post("/grouplink", function (req, res, next) {
  let token = req.headers.authorization ? req.headers.authorization : null;
  if (!token) {
    res.status(500).send({ error: true, msg: "No Token" });
    return;
  } else {
    let { id, inviteLink, twitterUsername } = req.body;
    if (!id) {
      res.status(500).send({ error: true, msg: "No id value" });
      return;
    } else if (!inviteLink) {
      res.status(500).send({ error: true, msg: "No Invitation Link value" });
      return;
    } else if (!twitterUsername) {
      res.status(500).send({ error: true, msg: "No Twitter Username value" });
      return;
    }
    let senddata = {
      id,
      inviteLink,
      twitterUsername,
    };
    // let senddata = {
    //   id: "-868694703",
    //   twitterUsername: "@Optidomains",
    //   isSecret: false,
    // };
    const options = {
      uri: `https://ton-core.contributiondao.com/telegram/groups/link`,
      method: `POST`,
      contentType: "application/json",
      headers: {
        Authorization: `${token}`,
      },
      json: senddata,
    };
    request(options, (req, ress) => {
      let data = ress.body ? ress.body : null;
      res.status(200).send({ error: false, data });
    });
  }
});
module.exports = [router, detail];
