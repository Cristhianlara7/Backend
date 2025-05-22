const Alerta = require('../models/Alerta');

const alertaController = {
    getAlertasPendientes: async (req, res) => {
        try {
            const alertas = await Alerta.find({ 
                estado: 'pendiente',
                fechaVencimiento: { $gte: new Date() }
            })
            .populate('equipo')
            .sort({ fechaVencimiento: 1 });
            
            res.json(alertas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const alerta = new Alerta(req.body);
            const nuevaAlerta = await alerta.save();
            res.status(201).json(nuevaAlerta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    marcarComoCompletada: async (req, res) => {
        try {
            const alerta = await Alerta.findByIdAndUpdate(
                req.params.id,
                { estado: 'completada' },
                { new: true }
            );
            
            if (!alerta) {
                return res.status(404).json({ message: 'Alerta no encontrada' });
            }
            
            res.json(alerta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = alertaController;