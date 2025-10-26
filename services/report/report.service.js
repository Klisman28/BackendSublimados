const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class ReportService {
  async getSalesByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const sales = await models.Sale.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
      include: [
        {
          model: models.Product,
          as: 'products',
          attributes: ['id', 'name', 'sku'],
          through: {
            as: 'item',
            attributes: ['quantity', 'unitPrice'],
          },
        },
        {
          model: models.Customer,
          as: 'customer',
          attributes: ['fullname', 'dni'],
        },
        {
          model: models.Enterprise,
          as: 'enterprise',
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    const total = await models.Sale.sum('total', {
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
    });

    return {
      sales,
      total,
      count: sales.length,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }
}

module.exports = ReportService;
