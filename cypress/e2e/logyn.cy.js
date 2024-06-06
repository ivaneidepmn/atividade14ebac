/// <reference types="cypress" />

describe('Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.fazerLogin("teste@qa.com.br", "123456").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Login realizado com sucesso');
            cy.log(response.body.authorization);
        });
    });

});
