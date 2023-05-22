const Cuenta = require('../models/cuenta')

module.exports = {
  getMain: async (req, res) => {
    const listaCuentas = await Cuenta.find({ userId: req.user.id });
    console.log(req.user);
    const userName = req.user.userName.charAt(0).toUpperCase() + req.user.userName.slice(1).toLowerCase();
    try {
      res.render("main.ejs", {
        user: req.user,
        userName : userName,
        listaCuentas: listaCuentas,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
