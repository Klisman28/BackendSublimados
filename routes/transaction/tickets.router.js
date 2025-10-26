const express = require('express');
const router  = express.Router();
const TicketsService = require('../services/tickets.service');
const service = new TicketsService();

// 1) Next ticket
router.get('/next', async (req, res, next) => {
  try {
    const numero = await service.getNext();
    res.json({ numero });
  } catch(err) {
    next(err);
  }
});

// 2) Create ticket (ya lo tenías)
router.post('/',
  validatorHandler(createTicketSchema, 'body'),
  async (req, res, next) => {
    /* tu create()… */
  }
);

module.exports = router;
