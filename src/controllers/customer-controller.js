'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

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
        await repository.create(req.body);
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }        
}

