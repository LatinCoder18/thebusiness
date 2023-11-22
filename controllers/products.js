
const ApiError = require('../helpers/ApiError');

const uploadImage = require('../helpers/utils/uploadFile');

const {
    createProduct,
    getAllProducts,
    getProductsById,
    getProductsByCategory,
    deleteProducts,
    updateProducts,
    setUnsetPromotedProducts,
    uploadProductsImage } = require('../services/products.service');

const { getBusinessById } = require('../services/business.service');

const fs = require('fs');

module.exports = {
    async createProducts(req, res) {
        const { name, description, businessId } = req.body;

        const business = await getBusinessById(businessId);
        if (!business) return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "businessNotFound" }));

        const products = await createProduct({ name, description, businessId });
        if (!products) {
            return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al crear el negocio', debugErrorMessage: "productsCreateError" }));
        }
        return res.json(products);
    },
    async getProductsByCategory(req, res) {
        const { category } = req.params;

        const productses = await getProductsByCategory(category);
        if (!productses) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al obtener los negocios por categoría', debugErrorMessage: "productsGetByCategoryError" }));

        return res.json(productses);
    },
    async updateProducts(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
        const checkProducts = await getProductsById(id);
        if (!checkProducts) return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "productsNotFound" }));

        const products = await updateProducts(parseInt(id), { name, description });
        if (!products) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al actualizar el negocio', debugErrorMessage: "productsUpdateError" }));

        return res.json(products);
    },
    async deleteProducts(req, res) {
        const { id } = req.params;

        const checkProducts = await getProductsById(id);
        if (!checkProducts) return res.status(404).json(new ApiError({ clientErrorMessage: 'Producto no encontrado', debugErrorMessage: "productsNotFound" }));

        const products = await deleteProducts(parseInt(id));
        if (!products) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al eliminar el negocio', debugErrorMessage: "productsDeleteError" }));

        return res.json({
            message: 'Producto eliminado correctamente',
        });
    },
    async uploadProductsImage(req, res) {
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

        const checkProducts = await getProductsById(id);
        if (!checkProducts) return res.status(404).json(new ApiError({ clientErrorMessage: 'Negocio no encontrado', debugErrorMessage: "productsNotFound" }));

        const products = await uploadProductsImage(parseInt(id), fixedImageResponse);
        if (!products) return res.status(400).json(new ApiError({ clientErrorMessage: 'Error al actualizar el negocio', debugErrorMessage: "productsUpdateError" }));

        return res.json(products);
    }
}