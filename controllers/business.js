
const ApiError = require('../helpers/ApiError');

const uploadImage = require('../helpers/utils/uploadFile');

const { createBusiness,
    getAllBusinesses,
    getBusinessById,
    getBusinessesByCategory,
    deleteBusiness,
    updateBusiness,
    setUnsetPromotedBusiness,
    uploadBusinessImage } = require('../services/business.service');
const fs = require('fs');

module.exports = {
    async createBusiness(req, res) {
        const { name, image, description, category } = req.body;
        //const { id } = req.user;
        const ownerId = 1;
        const business = await createBusiness({ name, image, description, category, ownerId });
        if (!business) {
            return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al crear el negocio', debugErrorMessage: "businessCreateError" }));
        }
        return res.json(business);
    },
    async getAllBusinesses(req, res) {
        const businesses = await getAllBusinesses();
        if (!businesses) {
            return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al obtener los negocios', debugErrorMessage: "businessGetAllError" }));
        }
        return res.json(businesses);
    },
    async getBusinessById(req, res) {
        const { id } = req.params;
        const business = await getBusinessById(id);
        if (!business) {
            return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "businessNotFound" }));
        }
        return res.json(business);
    },
    async getBusinessesByCategory(req, res) {
        const { category } = req.params;

        const businesses = await getBusinessesByCategory(category);
        if (!businesses) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al obtener los negocios por categoría', debugErrorMessage: "businessGetByCategoryError" }));

        return res.json(businesses);
    },
    async updateBusiness(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
        const checkBusiness = await getBusinessById(id);
        if (!checkBusiness) return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "businessNotFound" }));

        const business = await updateBusiness(parseInt(id), { name, description });
        if (!business) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al actualizar el negocio', debugErrorMessage: "businessUpdateError" }));

        return res.json(business);
    },
    async deleteBusiness(req, res) {
        const { id } = req.params;

        const checkBusiness = await getBusinessById(id);
        if (!checkBusiness) return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "businessNotFound" }));

        const business = await deleteBusiness(parseInt(id));
        if (!business) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al eliminar el negocio', debugErrorMessage: "businessDeleteError" }));

        return res.json({
            message: 'Negocio eliminado correctamente',
        });
    },
    async setUnsetPromotedBusiness(req, res) {
        const { id } = req.params;
        const { isPromoted } = req.body;

        const checkBusiness = await getBusinessById(id);
        if (!checkBusiness) return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "businessNotFound" }));

        const business = await setUnsetPromotedBusiness(parseInt(id), isPromoted);
        if (!business) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al actualizar el negocio', debugErrorMessage: "businessUpdateError" }));

        return res.json(business);
    },
    async uploadBusinessImage(req, res) {
        const { id } = req.params;
        const imagePath = req.files.file.tempFilePath;
        const image = fs.createReadStream(imagePath);
        const imageResponse = await uploadImage(image);

        const fixedImageResponse = {
            image: imageResponse.image.image,
            thumb: imageResponse.image.thumb,
            medium: imageResponse.image.medium,
        }
        if (!imageResponse) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al cargar la imagen', debugErrorMessage: "imageUploadError" }));

        const checkBusiness = await getBusinessById(id);
        if (!checkBusiness) return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "businessNotFound" }));

        const business = await uploadBusinessImage(parseInt(id), fixedImageResponse);
        if (!business) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al actualizar el negocio', debugErrorMessage: "businessUpdateError" }));

        return res.json(business);
    }
}