'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {    
    const res = await Product.find({
            active: true
        }, 'title price description slug');    
    return res;        
}

exports.getBySlug = async(slug) => {
    const res = await Product
    .findOne({ slug: slug,
               active: true 
    },'title price description slug');
    return res;
            
}

exports.getById = async(id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, 'title price description slug tags');
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();         
}

exports.update = async(id, data) => {
    await Product
    .findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}

exports.delete = async(id) => {
    await Product   
    .findByIdAndRemove(id)
}

/*exports.get = () => {
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

exports.create = (data) => {
    var product = new Product(data);
    return product.save();       

}

exports.update = (id, data) => {
    return Product
    .findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}

exports.delete = (id) => {
    return Product   
    .findByIdAndRemove(id)
}*/
