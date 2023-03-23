const mongoose = require("mongoose");

const SchemaConcepto = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Concepto", SchemaConcepto);
