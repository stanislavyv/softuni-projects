const { body } = require('express-validator');

const ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;
const PRODUCT_PATTERN = /^[a-zA-Z0-9\s]+$/;

exports.register = [
    body('username')
        .notEmpty()
        .withMessage('Username cannot be empty')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Username must be atleast 5 chars long')
        .matches(ALPHANUMERIC_PATTERN)
        .withMessage(
            'Username should consist only of English letters and/ or digits'
        ),
    body(['password', 'repeatPassword'])
        .notEmpty()
        .withMessage('Password cannot be empty')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be atleast 8 chars long')
        .matches(ALPHANUMERIC_PATTERN)
        .withMessage(
            'Password should consist only of English letters and/ or digits'
        ),
];

exports.username = [];

exports.password = [];

exports.product = [
    body('name')
        .isLength({ min: 5 })
        .withMessage('Name must be atleast 5 chars long')
        .matches(PRODUCT_PATTERN)
        .withMessage('Name cannot contain special characters')
        .toLowerCase(),
    body('imageUrl').isURL().withMessage('Please provide a valid image link'),
    body('description')
        .isLength({ min: 20 })
        .withMessage('Description must be atleast 5 chars long')
        .matches(PRODUCT_PATTERN)
        .withMessage('Description cannot contain special characters'),
];
