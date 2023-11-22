const Prisma = require('../database/config').getPrismaInstance();
const PrismaHelper = require('../helpers/PrismaHelper');


class UsersService {
    constructor() {
    }
    static async getUserById(id) {
        try {
            const user = await Prisma.users.findMany();
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }
    static async registerUser(data) {
        try {
            const user = await Prisma.users.create({ data });
            return user;
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }
    static async verifyUserOTP(id) {
        try {
            const user = await Prisma.users.update({
                where: { id },
                data: {
                    isVerified: true
                }
            });
            return user;
        } catch (error) {
            throw new Error('Error al verificar el usuario: ' + error.message);
        }
    }
    static async updateUser(id, data) {
        try {
            const user = await Prisma.users.update({
                where: { id },
                data
            });
            return user;
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }
    static async deleteUser(id) {
        try {
            const user = await Prisma.users.update({
                where: { id },
                data: {
                    isDeleted: true
                }
            });
            return user;
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
    static async getAllUsers() {
        try {
            const users = await Prisma.users.findMany();
            return users;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    }
    static async getUserByEmail(email) {
        try {
            const user = await Prisma.users.findFirst({
                where: { email },
            });
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }
    static async getUserByPhone(phone) {
        try {
            const user = await Prisma.users.findFirst({
                where: { phone },
            });
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }
}

module.exports = UsersService;
