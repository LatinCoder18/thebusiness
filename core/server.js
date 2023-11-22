const express = require('express');
const cors = require('cors');
// const { dbConnection } = require('../database/config');
const { load } = require('./routerhandler');
const { systeminfo } = require('./systeminfo');
const validarJSON = require('../middlewares/ValidateJSON');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const http = require('http');
const https = require('https');
const fileUpload = require('express-fileupload');
const credentials = {};

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;
        this.secure_port = process.env.SECURE_PORT;
        // Conectar base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares()
        // Rutas de mi app
        Server.instance = this;
        this.ErrorMiddleware = require('../middlewares/ErrorValidator').getErrorInstance();
        this.routes();
        //  this.listen();

    }
    middlewares() {
        // Protección
        this.app.use(cors())
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
        this.app.use(morgan('tiny'))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(validarJSON);
        this.app.use(express.static('public'))
    }
    async routes() {
        /**
         * Here we will load routes and setup to our webserver
         */
        // Load Routes
        const routes = await load();
        routes.map((element) => {
            this.app.use(`${element.path}`, require(`${element.route}`));
        });
        this.app.use('/', require('../routes/defaults'));
        this.app.use(this.ErrorMiddleware.errorLogger);
        this.app.use(this.ErrorMiddleware.errorResponder);

    }
    async conectarDB() {
        // await dbConnection();
    }
    static getServerInstance({ privateKey, certificate, ca }) {

        if (!Server.instance) {
            credentials.key = privateKey;
            credentials.cert = certificate;
            credentials.ca = ca;
            Server.instance = new Server();
        }

        return Server.instance;
    }

    async listen() {
        console.clear();
        // Starting both http & https servers
        const httpServer = http.createServer(this.app);
        const httpsServer = https.createServer(credentials, this.app);

        httpServer.listen(this.port, () => {
            console.log(`${process.env.SERVER_NAME.blue} server running on port`.white, this.port.blue);
        });

        httpsServer.listen(this.secure_port, () => {
            console.log(`${process.env.SERVER_NAME.blue} server running on port`.white, this.secure_port.blue);
        });

        await systeminfo();
    }
}
module.exports = Server;