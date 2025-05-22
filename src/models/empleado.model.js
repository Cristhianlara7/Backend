const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  departamento: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Empleado', empleadoSchema);