
const axios = require('axios');
const FormData = require('form-data');

async function uploadImage(images) {
    try {
        // Paso 1: Preparar la imagen para enviarla a la API de freeimage.host
        let image = {}
        // Paso 2: Hacer una solicitud POST a la API de freeimage.host
        let data = new FormData();
        data.append('source', images);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
            headers: {
                'Cookie': 'PHPSESSID=2u985dgtbl0cmue7e6m8n1s6e3',
                ...data.getHeaders()
            },
            data: data
        };

        const response = await axios.request(config);


        // Paso 4: Guardar la URL de la imagen en tu backend
        // Aquí debes implementar la lógica para guardar la URL en tu base de datos o en cualquier otro lugar

        return response.data;
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
        throw error;
    }
}

module.exports = uploadImage;
