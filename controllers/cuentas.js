const Cuenta = require("../models/cuenta");

module.exports = {
  getCuentas: async (req, res) => {
    const listaCuentas = await Cuenta.find({ userId: req.user.id });
    console.log(req.user);
    try {
      res.render("cuentas.ejs", {
        user: req.user,
        listaCuentas: listaCuentas,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getCuenta: async (req, res) => {
    const cuenta = await Cuenta.find({ _id: req.body.params});
    console.log(req.user);
    try {
      res.render("nuevaCuenta.ejs", {
        user: req.user,
        cuenta: cuenta,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createCuenta: async (req, res) => {
    try {
      await Cuenta.create({
        userId: req.user.id,
        nombre: req.body.nombre,
        moneda: req.body.moneda,
        saldo: req.body.saldo,
      });
      console.log("cuenta agregada");
      res.redirect("/cuentas");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
};
