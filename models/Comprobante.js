const mongoose = require("mongoose");

const comprobanteSchema = new mongoose.Schema({
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor",
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  pago: {
    type: String,
    required: true,
  },
  factura: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  moneda: {
    type: String,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Comprobar que solo pueda haber 1 comprobante con un numero de factura, por proveedor
comprobanteSchema.index({ proveedor: 1, factura: 1 }, { unique: true });

module.exports = mongoose.model("Comprobante", comprobanteSchema);
