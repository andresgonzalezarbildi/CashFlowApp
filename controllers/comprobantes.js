const Comprobante = require("../models/comprobante");
const Proveedor = require("../models/proveedor");

module.exports = {
  getComprobantes: async (req, res) => {
    const listaProveedores = await Proveedor.find({ userId: req.user.id });
    console.log(req.user);
    try {
      res.render("comprobantes.ejs", {
        user: req.user,
        listaProveedores: listaProveedores,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createComprobante: async (req, res) => {
    try {
      const proveedor = await Proveedor.findById(req.body.proveedor);
      const categoria = proveedor.categoria;
      await Comprobante.create({
        proveedor: req.body.proveedor,
        categoria: categoria,
        pago: req.body.pago.value,
        factura: req.body.factura,
        fecha: req.body.fecha,
        monto: req.body.monto,
        moneda: req.body.moneda,
        descripcion: req.body.descripcion,
        usuario: req.user.id,
      });
      console.log("comprobante agregado");
      res.redirect("/comrpobantes");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
};
