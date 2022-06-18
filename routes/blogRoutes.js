const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware')

const {
    getAllBlogs,
    createBlog,
    updateBlog,
    getBlogById,
    deleteBlog,
} = require('../controllers/blogControllers')

router.route('/').get(getAllBlogs).post(protect, admin, createBlog)

router.route('/:id').put(protect, admin, updateBlog).get(getBlogById).delete(protect, admin, deleteBlog)

module.exports = router