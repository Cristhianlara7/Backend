const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    tipoEquipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tipoequipos',
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true,
        unique: true
    },
    usuarioAsignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    // Campos específicos para computadores
    memoriaRam: {
        type: String,
        required: function() {
            return this.tipoEquipo && this.tipoEquipo.nombre === 'computador';
        }
    },
    discoDuro: {
        type: String,
        required: function() {
            return this.tipoEquipo && this.tipoEquipo.nombre === 'computador';
        }
    },
    procesador: {
        type: String,
        required: function() {
            return this.tipoEquipo && this.tipoEquipo.nombre === 'computador';
        }
    },
    notas: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Equipo', equipoSchema);