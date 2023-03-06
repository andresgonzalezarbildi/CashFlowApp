const Proveedor = require("../models/proveedor");

module.exports = {
  getProveedores: async (req, res) => {
    try {
      const listaProveedores = await Proveedor.find({ userId: req.user.id });
      res.render("settings", { listaProveedores });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },

  createProveedor: async (req, res) => {
    try {
      await Proveedor.create({
        nombreProveedor: req.body.nombre,
        categoria: req.body.categoria,
        saldoInicial: req.body.saldo,
        moneda: req.body.moneda,
        userId: req.user.id,
      });
      console.log("Proveedor agregado");
      res.redirect("/settings");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
  deleteProveedor: async (req, res) => {
    try {
      const deletedProveedor = await Proveedor.findOneAndDelete({
        _id: req.body.proveedorIdFromJSFile,
      });
      res.status(200).json({ message: "Proveedor borrado exitosamente" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
};
