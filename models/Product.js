const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({   
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageArray: {
        type: Array,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
 }, { timestamps: true})

 module.exports = Blog = mongoose.model('Product', productSchema)