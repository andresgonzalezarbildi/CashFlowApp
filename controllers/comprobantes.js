const Comprobante = require("../models/comprobante");

module.exports = {
  getComprobantes: async (req, res) => {
    const listaComprobantes = await Comprobante.find({ userId: req.user.id });
    console.log(req.user);
    try {
      res.render("comprobantes.ejs", {
        user: req.user,
        listaComprobantes: listaComprobantes,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createComprobante: async (req, res) => {
    try {
      const comrpobante = await Comprobante.findById(req.body.comprobante);
      const categoria = comprobante.categoria;
      await Comprobante.create({
        userId: req.user.id,
        fecha: req.body.fecha,
        tipo: req.body.tipo,
        cuentaId: req.body.cuenta.id,
        aCuenta: req.body.aCuenta.id,
        concepto: req.body.concepto,
        detalle: req.body.detalle,
        monto: req.body.monto,
      });
      console.log("comprobante agregado");
      res.redirect("/comrpobantes");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
};
