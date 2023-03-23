const Cuenta = require('../models/cuenta')

module.exports = {
  getMain: async (req, res) => {
    const listaCuentas = await Cuenta.find({ userId: req.user.id });
    console.log(req.user);
    try {
      res.render("main.ejs", {
        user: req.user,
        listaCuentas: listaCuentas,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
