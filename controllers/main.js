//const Main = require("../models/");

module.exports = {
  getMain: async (req, res) => {
    console.log(req.user);
    try {
      res.render("main.ejs", {
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getComprobantes: async (req, res) => {
    console.log("hey");
    try {
      res.render("comprobantes", {
        title: "Comprobantes",
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getSettings: async (req, res) => {
    console.log(req.user);
    try {
      res.render("settings.ejs", {
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
