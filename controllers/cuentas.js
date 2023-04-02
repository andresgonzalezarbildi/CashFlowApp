const Cuenta = require("../models/cuenta");

module.exports = {
  getCuentas: async (req, res) => {
    const listaCuentas = await Cuenta.find({ userId: req.user.id });
    try {
      res.render("cuentas.ejs", {
        user: req.user,
        listaCuentas: listaCuentas,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getNuevaCuenta: async (req, res) => {
    const { razon } = req.query;
    const mensaje = {
      "no-hay-cuentas": "Por favor, agrega una cuenta primero",
    };
    try {
      res.render("nuevaCuenta.ejs", {
        user: req.user,
        moneda: req.body.moneda,
        mensaje: mensaje[razon] || "",
      });
    } catch (err) {
      console.log(err);
    }
  },
  createCuenta: async (req, res) => {
    const nombre = req.body.nombre.trim();
    const saldo = req.body.saldo == "" ? 0 : req.body.saldo;
    const cuentaExistente = await Cuenta.findOne({
      userId: req.user.id,
      //  Checkea si la cuenta tiene el mismo nombre que otra, sin importar las mayusculas o minusculas
      nombre: { $regex: new RegExp(`^${nombre}$`, "i") },
    });
    try {
      if (!nombre) {
        const faltaNombre = "Por favor ingrese un nombre para la cuenta";
        res.render("nuevaCuenta", {
          faltaNombre,
          nombre: req.body.nombre,
          saldo: saldo,
          moneda: req.body.moneda,
        });
      } else if (!req.body.moneda) {
        const faltaMoneda = "Por favor elija una moneda";
        res.render("nuevaCuenta", {
          faltaMoneda,
          nombre: req.body.nombre,
          saldo: saldo,
        });
      } else if (!cuentaExistente) {
        await Cuenta.create({
          userId: req.user.id,
          nombre:
            nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
          moneda: req.body.moneda,
          saldo: saldo,
        });
        console.log("cuenta agregada");
        res.redirect("/cuentas");
      } else {
        const nombreRepetido = "Esa cuenta ya existe";
        res.render("nuevaCuenta", {
          nombreRepetido: nombreRepetido,
          moneda: req.body.moneda,
          saldo: saldo,
          nombre: req.body.nombre,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
  borrarCuenta: async (req, res) => {
    console.log(req.body.cuentaId);
    try {
      await Cuenta.findOneAndDelete({ _id: req.body.cuentaId });
      console.log("Cuenta borrada");
      res.json("Borrada");
    } catch (err) {
      console.log(err);
    }
  },
};
