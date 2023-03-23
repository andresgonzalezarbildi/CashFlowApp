const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override")
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const comprobantesRoutes = require("./routes/comprobantes");
const conceptosRoutes = require("./routes/conceptos");
const cuentasRoutes = require("./routes/cuentas");



require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
// BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));
// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/cuentas", cuentasRoutes);
app.use("/comprobantes", comprobantesRoutes);
app.use("/conceptos", conceptosRoutes);

// Handle 404
app.use((req, res, next) => {
  res.status(404);
  // respond with the custom 404 page
  res.render("404.ejs")
})


app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}, you better catch it!`
  );
});
