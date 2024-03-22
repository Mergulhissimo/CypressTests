/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

this.beforeEach(() => {
  cy
    .visit('./src/index.html')
})


it ('Confirma título', () => {
  cy
    .title()
    .should('be.equal','Central de Atendimento ao Cliente TAT')
})


 it ('preenche os campos obrigatórios e envia o formulário', () => {
  
  cy
    .get('[id="firstName"]')
    .click()
    .type('Nome')
    
  cy
    .get('[id="lastName"]')
    .click()
    .type('Sorenome')

  cy
    .get('[id="email"]')
    .click()
    .type('email@emai.com')

  cy
    .get('[id="open-text-area"]')
    .click()
    .type('Reclamação')

  cy
    .get('[type="submit"]')
    .click()

  cy
    .get('[class="success"]')
    .should("be.visible")
    .and('contain', 'Mensagem enviada com sucesso.')

    
  })




})