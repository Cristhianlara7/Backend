const mongoose = require('mongoose');

const historialCambioSchema = new mongoose.Schema({
    equipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HistorialCambio', historialCambioSchema);