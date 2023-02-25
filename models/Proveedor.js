const mongoose = require('mongoose')

const SchemaProveedor = new Schema({
  // elegir proveedor, factura o pago, etc
  nombreProveedor: String,
  categoria: String,
  saldoInicial: Number,
  moneda: String,
});


module.exports = mongoose.model('Proveedor', SchemaProveedor)
