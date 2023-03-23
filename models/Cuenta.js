const mongoose = require("mongoose");

const SchemaCuenta = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  moneda: {
    type: String,
    required: true,
  },
  saldo: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Cuenta", SchemaCuenta);
