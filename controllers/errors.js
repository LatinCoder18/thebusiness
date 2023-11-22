const Prisma = require('../database/config').getPrismaInstance();
const PrismaHelper = require('../helpers/PrismaHelper')

module.exports = {
    reportError: async (req, res) => {
        const error = await Prisma.error.create({
            data: {
                message: req.body.message,
                stack: req.body.stack,
                time: new Date(),
                url: 'N/A',
                path: 'N/A',
                request_body: JSON.stringify(request.body),
                request_query: JSON.stringify(request.query),
                request_params: JSON.stringify(request.params),
            }
        });
        res.status(200).json({
            message: "Error reported",
            error,
        });
    },
}

