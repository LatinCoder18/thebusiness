const Prisma = require('../database/config').getPrismaInstance();
const PrismaHelper = require('../helpers/PrismaHelper')

module.exports = {
    getUsers: async (req, res) => {
        let flights = await Prisma.flights.findMany();
        res.status(200).json((flighnts));
    },
}

