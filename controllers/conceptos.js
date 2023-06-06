const Concepto = require("../models/Concepto");

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
  getNuevoConcepto: async (req, res) => {
    try {
      res.render("nuevoConcepto.ejs", {
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createConcepto: async (req, res) => {
    const nombre = req.body.nombre.trim();
    const tipo = req.body.tipo;
    const conceptoExistente = await Concepto.findOne({
      userId: req.user.id,
      //  Checkea si el concepto tiene el mismo nombre que otro, sin importar las mayusculas o minusculas
      nombre: { $regex: new RegExp(`^${nombre}$`, "i") },
      tipo: req.body.tipo,
    });
    try {
      if (!nombre) {
        const faltaNombre = "Por favor ingrese un nombre para el concepto";
        res.render("nuevoConcepto", {
          faltaNombre,
          tipo: tipo,
        });
      } else if (!req.body.tipo) {
        const faltaTipo = "Por favor elija una tipo";
        res.render("nuevoConcepto", {
          faltaTipo,
          nombre: req.body.nombre,
        });
      } else if (!conceptoExistente) {
        await Concepto.create({
          userId: req.user.id,
          nombre:
            nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
          tipo: tipo,
        });
        console.log("Concepto creado");
        res.redirect("/conceptos");
      } else {
        const conceptoRepetido = "Ese concepto ya existe";
        res.render("nuevoConcepto", {
          conceptoRepetido: conceptoRepetido,
          nombre: req.body.nombre,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
  borrarConcepto: async (req, res) => {
    console.log(req.body.conceptoId);
    try {
      await Concepto.findOneAndDelete({ _id: req.body.conceptoId });
      console.log("Concepto borrado");
      res.json("Borrado");
    } catch (err) {
      console.log(err);
    }
  },
};
