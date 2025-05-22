const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');
const auth = require('../middleware/auth');

router.get('/pendientes', auth, alertaController.getAlertasPendientes);
router.post('/', auth, alertaController.create);
router.patch('/:id/completar', auth, alertaController.marcarComoCompletada);

module.exports = router;