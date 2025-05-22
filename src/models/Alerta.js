const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
    equipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    tipo: {
        type: String,
        enum: ['mantenimiento', 'asignacion', 'devolucion'],
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaVencimiento: Date,
    estado: {
        type: String,
        enum: ['pendiente', 'completada', 'vencida'],
        default: 'pendiente'
    },
    usuariosNotificados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Alerta', alertaSchema);