const Comprobante = require("../models/Comprobante");
const Cuenta = require("../models/Cuenta");
const Concepto = require("../models/Concepto");

module.exports = {
  getComprobantes: async (req, res) => {
    const listaCuentas = await Cuenta.find({ userId: req.user.id });
    if (listaCuentas.length == 0) {
      res.redirect(302, "/cuentas/agregar?razon=no-hay-cuentas");
    } else {
      const listaComprobantes = await Comprobante.find({ userId: req.user.id });
      const conceptoIds = listaComprobantes.map(
        (comprobante) => comprobante.concepto
      );
      const conceptoNames = await Concepto.find({ _id: { $in: conceptoIds } })
        .select("name")
        .lean();

      const conceptoMap = {};
      conceptoNames.forEach((concepto) => {
        conceptoMap[concepto._id.toString()] = concepto.name;
      });

      try {
        res.render("comprobantes.ejs", {
          user: req.user,
          listaComprobantes: listaComprobantes,
          listaCuentas: listaCuentas,
          conceptoMap: conceptoMap,
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  getNuevoComprobante: async (req, res) => {
    const listaCuentas = await Cuenta.find({ userId: req.user.id });
    let listaConceptos = await Concepto.find({userId: req.user.id})
    if (req.body.tipo) {
      listaConceptos = listaConceptos.filter(concepto => concepto.tipo === req.body.tipo)
    }
    try {
      res.render("nuevoComprobante.ejs", {
        user: req.user,
        listaCuentas: listaCuentas,
        listaConceptos: listaConceptos,
        moneda: req.body.moneda,
        tipo: req.body.tipo
      });
    } catch (err) {
      console.log(err);
    }
  },
  createComprobante: async (req, res) => {
    const cuentaComprobante = await Cuenta.find({ id: req.body.cuenta });
    const detalle = req.body.detalle.trim();
    console.log(req.body.cuenta)
    // convierte en gasto o ingreso el monto dado
    let posONeg = req.body.monto;
    if (req.body.tipo === "gasto") {
      posONeg *= -1;
    }
    const data = {
      userId: req.user.id,
      cuentaId: req.body.cuenta,
      fecha: req.body.fecha,
      tipo: req.body.tipo,
      concepto: req.body.concepto,
      detalle: detalle,
      monto: posONeg,
    };
    try {
      // Si falta alguno de los campos, recarga la pagina con un mensaje nuevo, y lo pasa en el render
      if (!req.body.cuenta) {
        const faltaCuenta = "Por favor ingrese una cuenta para el comprobante";
        res.render("nuevoComprobante", {
          faltaCuenta,
          ...data,
        });
      } else if (!req.body.tipo) {
        const faltaTipo = "Por favor seleccione el tipo de comprobante";
        res.render("nuevoComprobante", {
          faltaTipo,
          ...data,
        });
      } else if (!req.body.concepto) {
        const faltaConcepto =
          "Por favor seleccione el concepto al que corresponde el comprobante";
        res.render("nuevoComprobante", {
          faltaConcepto,
          ...data,
        });
      } else if (!req.body.detalle) {
        const faltaDetalle =
          "Por favor agregue la descripcion que corresponde del comprobante";
        res.render("nuevoComprobante", {
          faltaDetalle,
          ...data,
        });
      } else if (!req.body.monto) {
        const faltaMonto = "Por favor agregue el monto del comprobante";
        res.render("nuevoComprobante", {
          faltaMonto,
          ...data,
        });
      } else {
        await Comprobante.create(data);
        await Cuenta.findOneAndUpdate(
          { _id: req.body.cuenta },
          {
            $inc: { saldo: posONeg },
          }
        );
      }
      console.log("comprobante agregado");
      res.redirect("/comprobantes");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },

  borrarComprobante: async (req, res) => {
    try {
      const comprobanteABorrar = await Comprobante.findById(
        req.body.comprobanteId
      );
      await Cuenta.findOneAndUpdate(
        { _id: comprobanteABorrar.cuentaId },
        { $inc: { saldo: -comprobanteABorrar.monto } }
      );

      await Comprobante.findOneAndDelete({ _id: req.body.comprobanteId });
      console.log("Comprobante borrado");
      res.json("Borrado");
    } catch (err) {
      console.log(err);
    }
  },
};
