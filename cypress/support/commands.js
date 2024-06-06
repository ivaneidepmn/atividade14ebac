import contrato from '../contracts/produtos.contract';

Cypress.Commands.add('token', (email, senha) => {
    return cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Login realizado com sucesso');
        return response.body.authorization;
    });
});

Cypress.Commands.add('cadastrarProduto', (token, nome, preco, descricao, quantidade) => {
    return cy.request({
        method: 'POST',
        url: 'produtos',
        body: {
            "nome": nome,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        headers: { authorization: token }
    }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        return response;
    });
});
