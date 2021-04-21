const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const router = express.Router();
const authUserMiddleware = require('../middlewares/auth-user.middleware')
const controller = require('../controllers/user.controller');

router.get('/getProfile', authUserMiddleware.requireAuth, controller.get);

router.post('/updateInfo' , authUserMiddleware.requireAuth, upload.single('avatar'), controller.updateInfo)

router.post('/updatePassword', authUserMiddleware.requireAuth, controller.updatePassword)

module.exports = router;