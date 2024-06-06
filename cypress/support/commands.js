/// <reference types="cypress" />

Cypress.Commands.add('fazerLogin', (email, senha) => {
    return cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
    });
});

Cypress.Commands.add('listarProdutos', (token) => {
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

Cypress.Commands.add('cadastrarProduto', (token) => {
    let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`;
    cy.request({
        method: 'POST',
        url: 'produtos',
        headers: { Authorization: token },
        body: {
            nome: produto,
            preco: 200,
            descricao: "Produto novo",
            quantidade: 100
        }
    }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    });
});

Cypress.Commands.add('cadastrarProdutoRepetido', (token) => {
    cy.request({
        method: 'POST',
        url: 'produtos',
        headers: { Authorization: token },
        body: {
            nome: 'Produto EBAC Novo 1',
            preco: 250,
            descricao: "Descrição do produto novo",
            quantidade: 180
        }
    }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Já existe produto com esse nome');
    });
});

