const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const authMiddleware = require('./middleware/Auth');

const routes = express.Router();

const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')
const UserController = require('./controllers/UserController')

routes.use(authMiddleware);

routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post(
    '/boxes/:id/files', 
    multer(multerConfig).single('file'), FileController.store); //single: permite o envio de um arq. por vez | 'file': é o nome no front-end
routes.post('/auth/register', UserController.store);
routes.post('/authenticate', UserController.auth);

module.exports = routes;