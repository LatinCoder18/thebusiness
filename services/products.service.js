const Prisma = require('../database/config').getPrismaInstance();

const PrismaHelper = require('../helpers/PrismaHelper');

class ProductsService {
    constructor() {
    }

    static async getAllProducts() {
        try {
            const products = await Prisma.products.findMany();
            return products;
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error.message);
        }
    }

    static async getProductsById(id) {
        try {
            const products = await Prisma.products.findUnique({
                where: { id: parseInt(id) }
            });
            return products;
        } catch (error) {
            throw new Error('Error al obtener el producto: ' + error.message);
        }
    }

    static async getProductsByCategory(category) {
        try {
            const products = await Prisma.products.findMany({
                where: { category },
            });
            return products;
        } catch (error) {
            throw new Error('Error al obtener los productos por categoría: ' + error.message);
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

    static async updateProducts(id, data) {
        try {
            const products = await Prisma.products.update({
                where: { id: parseInt(id) },
                data,
            });
            return products;
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    static async deleteProducts(id) {
        try {
            const products = await Prisma.products.delete({
                where: { id: parseInt(id) },
            });
            return products;
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
    static async uploadProductsImage(id, image) {
        try {
            const products = await Prisma.products.update({
                where: { id: parseInt(id) },
                data: {
                    image: image
                }
            });
            return products;
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }
}

module.exports = ProductsService;
