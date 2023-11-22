const Prisma = require('@prisma/client');

class Database {
    constructor() {
        this.prisma = null;
    }
    static getPrismaInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
            Database.instance.prisma = new Prisma.PrismaClient();
        }
        return Database.instance.prisma;
    }
}

module.exports = Database;