const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');
const auth = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');

// Rutas de búsqueda y estadísticas (deben ir primero)
router.get('/buscar', auth, equipoController.buscarEquipos);
router.get('/estadisticas', auth, equipoController.getEstadisticas);

// Rutas públicas (accesibles para visitantes y administradores)
router.get('/', equipoController.getAll);
router.get('/:id', equipoController.getById);

// Rutas protegidas (solo para administradores)
router.post('/', auth, verificarRol(['administrador']), equipoController.create);
router.put('/:id', auth, verificarRol(['administrador']), equipoController.update);
router.delete('/:id', auth, verificarRol(['administrador']), equipoController.delete);

// Modificar la ruta de asignación
router.post('/:id/asignar-equipo', auth, equipoController.asignarEquipo);

module.exports = router;