const asyncHandler = require('express-async-handler');

const Product = require('../models/Product');

const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 10
    const pageNumber = Number(req.query.pageNumber) || 1

    const count = await Product.countDocuments()

    const products = await Product.find().limit(pageSize).skip(pageSize * (pageNumber - 1))

    res.json({ products, pageNumber, pages: Math.ceil(count / pageSize)})
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({ message: "Product removed"})
    } else {
        res.status(404)
        throw new Error("Product not Found")
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        title: req.body.title,
        image: req.body.title.image,
        imageArray: req.body.imageArray,
        price: req.body.price,
        description: req.body.description,
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const { title, image, imageArray, price, description } = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        product.title = title
        product.image = image
        product.imageArray = imageArray
        product.price = price
        product.description = description
    }

    const updatedProduct = await product.save()

res.status(201).json(updatedProduct)
})

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct,
 }