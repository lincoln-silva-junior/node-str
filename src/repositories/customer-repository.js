'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();         
}

exports.authenticate = async(data) => {   
    console.log('data: ' + JSON.stringify(data)); 
    console.log('data: ' + JSON.stringify(data.email)); 
    console.log('data: ' + JSON.stringify(data.password)); 
    const res = await Customer.findOne({
            email: data.email,
            password: data.password   
        });    
    return res;        
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}

 