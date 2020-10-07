const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddproduct);

// /admin/product => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddproduct);

router.get('/edit-product/:productId', adminController.getEditproduct);

router.post('/edit-product', adminController.postEditproduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;