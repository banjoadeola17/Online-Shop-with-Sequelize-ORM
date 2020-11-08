const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
body('password', 'Password has to be valid')
.isLength({min: 6})
.isAlphanumeric().trim(),  
authController.postLogin);

router.post('/signup', 
check('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail()
.custom((value, {req}) => {
    return User.findOne({email: value})
    .then(userDoc => {
        if(userDoc) {
        return Promise.reject('Email already exists, please pick a different one!');
        }
    });
}), 
body('password', 'Please enter a password with only numbers and text and minimum of 6 characters')
.isLength({min: 6})
.isAlphanumeric().trim(), 
body('confirmPassword').custom((value, {req}) => {
    if(value !== req.body.password) {
        throw new Error('Passwords have to match!');
    }
    return true;
}),
authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;