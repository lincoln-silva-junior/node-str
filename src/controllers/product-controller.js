'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)           ;
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
}

exports.post = async(req, res, next) => {
    //Validação sem mongoose
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');


    //Se os dados forem inválidos
    if (!contract.isValid()) {
        console.log('entrei aqui');
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }        
}

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
}

/*exports.get = (req, res, next) => {
        repository
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });    
}

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)           
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });    
}

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)           
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });    
}

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)           
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });    
}

exports.post = (req, res, next) => {
    //Validação sem mongoose
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');
    
    
    //Se os dados forem inválidos
    if (!contract.isValid()) {
        console.log('entrei aqui');
        res.status(400).send(contract.errors()).end();
        return;
    }


    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar produto',
                data: e
            });
        });    
}

exports.put = (req, res, next) => {
    repository
    .update(req.params.id, req.body)
    .then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar produto',
            data: e
        });
    });
}

exports.delete = (req, res, next) => {
    repository
    .delete(req.body.id)
    .then(x => {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: e
        });
    });
}*/

