/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract';

describe('Testes da Funcionalidade Produtos', () => {
    let token;

    before(() => {
        cy.fazerLogin('fulano@qa.com', 'teste').then(tkn => { token = tkn });
    });

    it('Deve validar contrato de produtos', () => {
        cy.request('produtos').then(response => {
            contrato.validateAsync(response.body);
        });
    });

    it('Deve listar os produtos cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
            headers: { Authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('produtos');
            expect(response.duration).to.be.lessThan(20);
        });
    });

    it('Deve cadastrar um produto com sucesso', () => {
        cy.cadastrarProduto(token).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        });
    });

    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.cadastrarProdutoRepetido(token).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Já existe produto com esse nome');
        });
    });

    it('Deve editar um produto já cadastrado', () => {
        cy.editarProduto(token).then((response) => {
            expect(response.body.message).to.equal('Registro alterado com sucesso');
        });
    });

    it('Deve editar um produto cadastrado previamente', () => {
        cy.editarProdutoPreviamenteCadastrado(token).then((response) => {
            expect(response.body.message).to.equal('Registro alterado com sucesso');
        });
    });

    it('Deve deletar um produto previamente cadastrado', () => {
        cy.deletarProduto(token).then((response) => {
            expect(response.body.message).to.equal('Registro excluído com sucesso');
            expect(response.status).to.equal(200);
        });
    });
});
