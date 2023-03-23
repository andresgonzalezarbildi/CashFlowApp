const mongoose = require("mongoose");

const SchemaComprobante = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
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
