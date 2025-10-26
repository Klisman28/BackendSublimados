const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');
const CashiersService = require('../transaction/cashiers.service');
const UsersService = require('../../services/organization/users.service');

const userService = new UsersService();
const cashierService = new CashiersService();

class OpeningsService {
    async find(query) {
        const { limit, offset, search, sortColumn, sortDirection } = query;
        const options = {
            order: [(sortColumn) ? [sortColumn, sortDirection] : ['id', 'DESC']]
        }
        const optionsCount = {};

        if (limit && offset) {
            options.limit = parseInt(limit);
            options.offset = parseInt(offset);
        }

        if (search) {
            options.where = {
                id: {
                    [Op.like]: `%${search}%`
                }
            }

            optionsCount.where = {
                id: {
                    [Op.like]: `%${search}%`
                }
            }
        }

        const openings = await models.Opening.findAll(options);
        const total = await models.Opening.count(optionsCount);

        return { openings, total };
    }

    async create(data, userId) {
        const user = await userService.findOne(userId);
        const employeeId = user.dataValues.employee.id
        const startDatetime = new Date();

        const opening = await models.Opening.create({
            ...data,
            employeeId,
            startDatetime,
            status: 1
        });

        if (opening) {
            let cashier = await cashierService.findOne(data.cashierId)
            await cashier.update({status: 1})
        }
        return opening;
    }

    async findOne(id) {
        const opening = await models.Opening.findByPk(id, {
            include: ['cashier', 'employee']
        });
        if (!opening) {
            throw boom.notFound('No se encontró ninguna apertura');
        }
        return opening;
    }

    async findByEmployee(userId) {
        const user = await userService.findOne(userId);
        const employeeId = user.dataValues.employee.id

        const opening = await models.Opening.findOne({
            include: ['cashier', 'employee', 'sales'],
            where: {
                status: 1,
                employeeId
            }
        });
        if (!opening) {
            throw boom.notFound('No existe ninguna caja aperturada');
        }
        return opening;
    }

    async update(id, changes) {
        let opening = await this.findOne(id);
        opening = await opening.update(changes);

        if (opening) {
            let cashier = await cashierService.findOne(opening.cashierId)
            await cashier.update({status: 0})
        }

        return opening;
    }

    async delete(id) {
        const opening = await this.findOne(id);
        await opening.destroy();
        return { id };
    }
}

module.exports = OpeningsService;