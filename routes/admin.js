const path = require('path');

const express = require('express');

const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth,  adminController.getAddproduct);

// /admin/product => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
body('title').isString().isLength({min: 5}).withMessage('Title should be minimum length of 5, and is Alphanumeric.'),
body('price').isFloat().withMessage('Price must be decimal.'),
body('description').isAlpha().isLength({min: 5, max: 200}) ],
isAuth, adminController.postAddproduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditproduct);

router.post('/edit-product', [
body('title').isString().isLength({min: 5}).withMessage('Title should be minimum length of 5, and is Alphanumeric.'),
body('price').isFloat().withMessage('Price must be decimal.'),
body('description').isAlpha().isLength({min: 5, max: 200}) ],
isAuth, adminController.postEditproduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;