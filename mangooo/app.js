const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

const sessionOpt = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
};

app.use(session(sessionOpt));
app.use(flash());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/register", (req, res) => {
  let { name = "Annonymous" } = req.query;
  req.session.name = name;
  req.flash("success", "User registered successfully.");
  res.redirect("/hello");
});
app.get("/hello", (req, res) => {
  res.send(`Hello, ${req.flash("success")} `);
});

// app.get("/reqCount", (req, res) => {
//   if (req.session.count) req.session.count++;
//   else req.session.count = 1;
//   res.send(`You visited this site ${req.session.count} times.`);
// });

app.listen(3000);
