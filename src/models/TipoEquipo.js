const mongoose = require('mongoose');

const tipoEquipoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
     },
    descripcion: {
        type: String,
        required: false,
        default: 'Sin descripción'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tipoequipos', tipoEquipoSchema, 'tipoequipos');