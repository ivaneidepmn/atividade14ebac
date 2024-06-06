import contrato from '../contracts/produtos.contract';

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
    });
});
