const express = require('express');
const router = express.Router();
const Empleado = require('../models/empleado.model');

// Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error: error.message });
    }
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
    try {
        const empleado = new Empleado(req.body);
        await empleado.save();
        res.status(201).json(empleado);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear empleado', error: error.message });
    }
});

// Obtener un empleado por ID
router.get('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleado', error: error.message });
    }
});

// Actualizar un empleado
router.put('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar empleado', error: error.message });
    }
});

// Eliminar un empleado
router.delete('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar empleado', error: error.message });
    }
})

// Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
      const empleados = await Empleado.find();
      res.json(empleados);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;