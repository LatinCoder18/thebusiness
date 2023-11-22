const PrismaClient = require('../database/config').getPrismaInstance();
const PrismaHelper = require('../helpers/PrismaHelper')
/**
 * Endpoint para brindar informacion sobre la aplicación a los usuarios
 */
module.exports = {
    getApkInfo: async (req, res) => {

        res.status(200).json({
            message: "Error reported",
        });
    },
    updateApkInfo: async (req, res) => {

    },
    uploadNewVersion: async (req, res) => {
        
    }

}

