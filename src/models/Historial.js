const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
    equipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    tipoMovimiento: {
        type: String,
        required: true,
        enum: ['asignacion', 'devolucion', 'mantenimiento', 'actualizacion']
    },
    descripcion: {
        type: String,
        required: true
    },
    usuarioAnterior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    usuarioNuevo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    fechaMovimiento: {
        type: Date,
        default: Date.now
    },
    realizadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Historial', historialSchema);