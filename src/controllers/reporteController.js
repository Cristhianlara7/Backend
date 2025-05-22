const Equipo = require('../models/Equipo');
const Historial = require('../models/Historial');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

const reporteController = {
    // Generar reporte de inventario en Excel
    generarReporteExcel: async (req, res) => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Inventario');

            worksheet.columns = [
                { header: 'Código', key: 'codigo' },
                { header: 'Tipo', key: 'tipoEquipo' },
                { header: 'Marca', key: 'marca' },
                { header: 'Modelo', key: 'modelo' },
                { header: 'Serial', key: 'serial' },
                { header: 'Usuario Asignado', key: 'usuarioAsignado' },
                { header: 'Estado', key: 'estado' }
            ];

            const equipos = await Equipo.find()
                .populate('tipoEquipo')
                .populate('usuarioAsignado');

            equipos.forEach(equipo => {
                worksheet.addRow({
                    codigo: equipo.codigo,
                    tipoEquipo: equipo.tipoEquipo?.nombre || 'N/A',
                    marca: equipo.marca,
                    modelo: equipo.modelo,
                    serial: equipo.serial,
                    usuarioAsignado: equipo.usuarioAsignado?.nombre || 'No asignado',
                    estado: equipo.usuarioAsignado ? 'Asignado' : 'Disponible'
                });
            });

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=inventario.xlsx');

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Generar reporte PDF de mantenimientos
    generarReporteMantenimientosPDF: async (req, res) => {
        try {
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=mantenimientos.pdf');
            doc.pipe(res);

            const mantenimientos = await Historial.find({ tipoMovimiento: 'mantenimiento' })
                .populate('equipo')
                .populate('realizadoPor')
                .sort({ fechaMovimiento: -1 });

            doc.fontSize(16).text('Reporte de Mantenimientos', { align: 'center' });
            doc.moveDown();

            mantenimientos.forEach(mant => {
                doc.fontSize(12).text(`Equipo: ${mant.equipo.codigo} - ${mant.equipo.marca} ${mant.equipo.modelo}`);
                doc.fontSize(10).text(`Fecha: ${mant.fechaMovimiento.toLocaleDateString()}`);
                doc.fontSize(10).text(`Realizado por: ${mant.realizadoPor.nombre}`);
                doc.fontSize(10).text(`Descripción: ${mant.descripcion}`);
                doc.moveDown();
            });

            doc.end();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = reporteController;