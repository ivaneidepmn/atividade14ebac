const Joi = require('joi');

// Definição do esquema de validação para produtos
const produtoSchema = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().min(0).required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().min(0).required()
});

module.exports = produtoSchema;
