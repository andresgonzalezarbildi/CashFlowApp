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


// usar .env
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);
// conectar a mongodb
connectDB();
  // usar ejs como nuestro view engine
app.set("view engine", "ejs");
// express nos permite ustar la carpeta public como acceso a nuestros archivos, como css, js ...
app.use(express.static("public"));
// Express ahora trae BodyParser, nos permite tomar datos del body, por ejemplo en forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// usamos morgan para loggear lo que se pide en el servidor, solo dev
app.use(logger("dev"));
// Sessions nos permite mantener la sesion iniciada aunque cerremos el navegador
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
// flash nos permite mostrar errores a la hora de log in y sign in
app.use(flash());

// rutas que usaremos
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

// seleccionar puerto 
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}, you better catch it!`
  );
});
