const Concepto = require("../models/concepto");

module.exports = {
  getConceptos: async (req, res) => {
    const listaConceptos = await Concepto.find({ userId: req.user.id });
    console.log(req.user);
    try {
      res.render("conceptos.ejs", {
        user: req.user,
        listaConceptos: listaConceptos,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createConcepto: async (req, res) => {
    try {
      const concepto = await Concepto.findById(req.body.proveedor);
      await Concepto.create({
        userId: req.user.id,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
      });
      console.log("concepto agregado");
      res.redirect("/conceptos");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
};
