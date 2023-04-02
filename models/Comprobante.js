const mongoose = require("mongoose");

const SchemaComprobante = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moneda: {
    type: String,
  },
  fecha: {
    type: Date,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  nombreDeCuenta: {
    type: String,
  },
  cuentaId: {
    type: String,
    required: true,
  },
  aCuenta: {
    type: String,
    required: false,
  },
  concepto: {
    type: String,
    required: true,
  },
  detalle: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Comprobante", SchemaComprobante);
