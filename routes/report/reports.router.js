const express = require('express');
const ReportService = require('../../services/report/report.service');
const { success } = require('../response');
const Joi = require('joi');

const router = express.Router();
const service = new ReportService();

const querySchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required()
});

router.get('/sales/date-range', async (req, res, next) => {
  try {
    const { error } = querySchema.validate(req.query);
    if (error) return res.status(400).json({ message: error.message });

    const { startDate, endDate } = req.query;
    const report = await service.getSalesByDateRange(startDate, endDate);
    success(res, report, 'Reporte generado con éxito');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
