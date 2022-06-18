const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware')

const {
    getAllProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct,
} = require('../controllers/ProductControllers')

router.route('/').get(getAllProducts).post(protect, admin, createProduct)

router.route('/:id').put(protect, admin, updateProduct).get(getProductById).delete(protect, admin, deleteProduct)

module.exports = router