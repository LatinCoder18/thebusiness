const Prisma = require('../database/config').getPrismaInstance();
const PrismaHelper = require('../helpers/PrismaHelper');

class DashboardService {
    constructor() {
    }
    async getDashboardData(id) {
        try {
            const business = await this.prisma.business.delete({
                where: { id },
            });
            return business;
        } catch (error) {
            throw new Error('Error al eliminar el negocio: ' + error.message);
        }
    }
}

module.exports = BusinessService;
