require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// models

const User = require("./models/user.model.js");

// routers
const listRouter = require("./routes/list.route.js");
const reviewRouter = require("./routes/review.route.js");
const authRouter = require("./routes/auth.route.js");
// custom error
const ExpressError = require("./utils/ExpressError.js");
// confidentials
const PORT = process.env.PORT || 5500;

// important tasks
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "ut&ns7CJe)2P",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(cookieParser());
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// database connection

const connectDB = require("./db/db.js");
connectDB();

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// root route
app.get("/", (req, res) => {
  res.render("home");
});

// list routes
app.use("/lists", listRouter);
// review routes
app.use("/lists/:id/reviews", reviewRouter);
// auth routes
app.use("/auth/", authRouter);

// forbideden routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found."));
});
// error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Internal Server Error." } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
