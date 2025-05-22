const Historial = require('../models/Historial');
const Equipo = require('../models/Equipo');

const historialController = {
    // Obtener todo el historial
    getAll: async (req, res) => {
        try {
            const historial = await Historial.find()
                .populate('equipo')
                .populate('usuarioAnterior')
                .populate('usuarioNuevo')
                .populate('realizadoPor')
                .sort({ fechaMovimiento: -1 });
            res.json(historial);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener historial por equipo
    getByEquipo: async (req, res) => {
        try {
            const historial = await Historial.find({ equipo: req.params.equipoId })
                .populate('equipo')
                .populate('usuarioAnterior')
                .populate('usuarioNuevo')
                .populate('realizadoPor')
                .sort({ fechaMovimiento: -1 });
            res.json(historial);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Crear nuevo registro en el historial
    create: async (req, res) => {
        try {
            const historial = new Historial({
                ...req.body,
                realizadoPor: req.usuario._id // Usuario autenticado
            });

            // Si es una asignación o devolución, actualizar el equipo
            if (req.body.tipoMovimiento === 'asignacion') {
                await Equipo.findByIdAndUpdate(req.body.equipo, {
                    usuarioAsignado: req.body.usuarioNuevo
                });
            } else if (req.body.tipoMovimiento === 'devolucion') {
                await Equipo.findByIdAndUpdate(req.body.equipo, {
                    usuarioAsignado: null
                });
            }

            const nuevoHistorial = await historial.save();
            await nuevoHistorial.populate(['equipo', 'usuarioAnterior', 'usuarioNuevo', 'realizadoPor']);
            res.status(201).json(nuevoHistorial);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = historialController;