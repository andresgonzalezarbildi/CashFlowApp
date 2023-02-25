const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const SchemaComprobante = new Schema({
  // elegir proveedor, factura o pago, etc 
  proveedor: String,
  pago: Boolean,
  factura: Boolean,
  fecha: Date,
  monto: Date,
  descripcion: String,
})


module.exports = mongoose.model("Comprobante", SchemaComprobante);
