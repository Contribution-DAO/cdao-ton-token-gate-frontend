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

module.exports = [router, detail];
