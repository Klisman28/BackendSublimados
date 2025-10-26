// services/tickets.service.js
const boom   = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class TicketsService {
  /**
   * Crea un ticket (la BD asigna automáticamente el id/ticketNum).
   * @param {{ tipo: string, fecha: Date, … }} data
   * @returns {Promise<Model>} instancia del ticket con su id auto-incremental
   */
  async create(data) {
    try {
      const ticket = await models.Ticket.create(data);
      return ticket;
    } catch (err) {
      // opcional: envolver en Boom para middleware de errores
      throw boom.internal('Error creando ticket', err);
    }
  }

  /**
   * Sólo para mostrar el próximo número antes de guardar
   * (no garantiza atomicidad en altas concurrencias).
   * @returns {Promise<number>} max(id) + 1 o 1 si no hay ninguno
   */
  async getNext() {
    try {
      const maxId = await models.Ticket.max('id');
      return (maxId || 0) + 1;
    } catch (err) {
      throw boom.internal('Error obteniendo próximo número', err);
    }
  }
}

module.exports = TicketsService;
