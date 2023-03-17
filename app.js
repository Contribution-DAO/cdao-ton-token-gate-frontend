var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var http = require("http");
// var logger = require('morgan');

var indexRouter = require("./routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

http.createServer(app).listen(3005, function () {
  let PORT = 3005;
  console.log("listening on *:" + PORT);
});
// https
//   .createServer(httpsOptions, app)
//   .listen(parsed.PORTHTTPS || 438, function () {
//     let PORTHTTP = parsed.PORTHTTPS || 438;
//     console.log("https listening on *:" + PORTHTTP);
//   });

module.exports = app;
