require('dotenv').config()
const Server = require('./core/server');
// Web App Module
const fs = require('fs');

const app = async () => {
    // Here you can start modules
    const privateKey = fs.readFileSync(`./core/certificates/${process.env.DOMAIN}/privkey.pem`, 'utf8');
    const certificate = fs.readFileSync(`./core/certificates/${process.env.DOMAIN}/cert.pem`, 'utf8');
    const ca = fs.readFileSync(`./core/certificates/${process.env.DOMAIN}/chain.pem`, 'utf8');
    
    Server.getServerInstance({privateKey,certificate,ca}).listen();
}
app();