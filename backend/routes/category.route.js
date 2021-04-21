const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

router.post('/create', controller.create);

router.get('/:id', controller.getCategory);

module.exports = router;