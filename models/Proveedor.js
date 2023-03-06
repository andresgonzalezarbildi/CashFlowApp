const mongoose = require("mongoose");

const SchemaProveedor = new mongoose.Schema({
  nombreProveedor: String,
  categoria: String,
  saldoInicial: Number,
  moneda: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Proveedor", SchemaProveedor);
