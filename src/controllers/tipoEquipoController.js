const TipoEquipo = require('../models/TipoEquipo');
const Equipo = require('../models/Equipo'); // Agregar esta línea

const tipoEquipoController = {
    getAll: async (req, res) => {
        try {
            const tipos = await TipoEquipo.find().select('nombre descripcion');
            res.json(tipos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { nombre, descripcion } = req.body;
            const tipoEquipo = new TipoEquipo({
                nombre,
                descripcion: descripcion || 'Sin descripción'
            });
            const nuevoTipo = await tipoEquipo.save();
            res.status(201).json(nuevoTipo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            // Verificar si hay equipos que usan este tipo
            const equiposConEsteTipo = await Equipo.findOne({ tipoEquipo: req.params.id });
            
            if (equiposConEsteTipo) {
                return res.status(400).json({ 
                    message: 'No se puede eliminar este tipo de equipo porque hay equipos que lo están utilizando. Por favor, modifique o elimine los equipos asociados primero.' 
                });
            }

            const tipo = await TipoEquipo.findByIdAndDelete(req.params.id);
            if (!tipo) {
                return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
            }
            res.json({ message: 'Tipo de equipo eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = tipoEquipoController;