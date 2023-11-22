const Prisma = require('../database/config').getPrismaInstance();

const PrismaHelper = require('../helpers/PrismaHelper');

class BusinessService {
    constructor() {
    }

    static async getAllBusinesses() {
        try {
            const businesses = await Prisma.business.findMany();
            return businesses;
        } catch (error) {
            throw new Error('Error al obtener los negocios: ' + error.message);
        }
    }

    static async getBusinessById(id) {
        try {
            const business = await Prisma.business.findUnique({
                where: { id: parseInt(id) },
                include: {
                    Products: true
                }
            });
            return business;
        } catch (error) {
            throw new Error('Error al obtener el negocio: ' + error.message);
        }
    }

    static async getBusinessesByCategory(category) {
        try {
            const businesses = await Prisma.business.findMany({
                where: { category },
            });
            return businesses;
        } catch (error) {
            throw new Error('Error al obtener los negocios por categoría: ' + error.message);
        }
    }
    static async createProduct(data) {
        try {
            const products = await Prisma.products.create({ data });
            return products;
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    static async createBusiness(data) {
        try {
            const business = await Prisma.business.create({ data });
            return business;
        } catch (error) {
            throw new Error('Error al crear el negocio: ' + error.message);
        }
    }

    static async updateBusiness(id, data) {
        try {
            const business = await Prisma.business.update({
                where: { id: parseInt(id) },
                data,
            });
            return business;
        } catch (error) {
            throw new Error('Error al actualizar el negocio: ' + error.message);
        }
    }

    static async deleteBusiness(id) {
        try {
            const business = await Prisma.business.delete({
                where: { id: parseInt(id) },
            });
            return business;
        } catch (error) {
            throw new Error('Error al eliminar el negocio: ' + error.message);
        }
    }
    static async setUnsetPromotedBusiness(id, isPromoted) {
        try {
            const business = await Prisma.business.update({
                where: { id: parseInt(id) },
                data: { isPromoted: { set: isPromoted } },
            });
            return business;
        } catch (error) {
            throw new Error('Error al actualizar el negocio: ' + error.message);
        }
    }
    static async uploadBusinessImage(id, image) {
        try {
            const business = await Prisma.business.update({
                where: { id: parseInt(id) },
                data: {
                    image: image
                }
            });
            return business;
        } catch (error) {
            throw new Error('Error al actualizar el negocio: ' + error.message);
        }
    }
}

module.exports = BusinessService;
