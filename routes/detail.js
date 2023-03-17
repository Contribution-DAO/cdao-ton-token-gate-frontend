const router = require("./router");
const request = require("request");

router.get("/detail/:id", function (req, res, next) {
  let paramsend = {
    views: "detail.ejs",
  };
  let id = req.params.id;
  const options = {
    uri: `https://ton-core.contributiondao.com/telegram/groups/${id}`,
    method: `GET`,
    contentType: "application/json",
    // headers: {
    //   Authorization: `${stsconfig.authorizationkey}`,
    // },
  };
  request(options, (req, ress) => {
    let data = ress.body ? ress.body : null;
    let detail = JSON.parse(data);
    paramsend = {
      ...paramsend,
      detail,
    };
    console.log(paramsend);
    res.render(`index.ejs`, paramsend);
  });
});

module.exports = router;
