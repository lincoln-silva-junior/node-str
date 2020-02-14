'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.post = async(req, res, next) => {
    //Validação sem mongoose
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.email, 'Email Inválido!');
    contract.hasMinLen(req.body.password, 6, 'A password deve conter pelo menos 6 caracteres.');


    //Se os dados forem inválidos
    if (!contract.isValid()) {        
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({ 
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(req.body.email, 'Bem Vindo ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name))

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }        
}

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({ 
            email: req.body.email,            
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer) {
            res.status(404).send({ message: 'usuário ou email inválidos!'
            });
            return;
        }

        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        });               

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }            
        });
    } catch (e) {
        res.status(500).send({ message: e.message
            //message: 'Falha ao processar sua requisição'
        });
    }        
}

