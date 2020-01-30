'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({
            active: true
        }, 'title price description slug');
}

exports.getBySlug = (slug) => {
    return Product
            .findOne({ slug: slug,
                       active: true 
            },'title price description slug');
}

exports.getById = (id) => {
    return Product
            .findById(id);
}

exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title price description slug tags');
}
