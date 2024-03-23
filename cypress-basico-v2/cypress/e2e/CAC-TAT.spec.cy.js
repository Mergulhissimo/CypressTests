/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

this.beforeEach(() => {
  cy
    .visit('./src/index.html')
  })


it('Confirma título', () => {
  cy
    .title()
    .should('be.equal','Central de Atendimento ao Cliente TAT')
  })


it('preenche os campos obrigatórios e envia o formulário', () => {
  
  cy
    .get('[id="firstName"]')
    .click()
    .type('Nome',{delay:0})
    
  cy
    .get('[id="lastName"]')
    .click()
    .type('Sorenome',{delay:0})

  cy
    .get('[id="email"]')
    .click()
    .type('email@emai.com',{delay:0})

  cy
    .get('[id="open-text-area"]')
    .click()
    .type('Reclamação Reclamação Reclamação ',{delay:0})

  cy
    .get('[type="submit"]')
    .click()

  cy
    .get('[class="success"]')
    .should("be.visible")
    .and('contain', 'Mensagem enviada com sucesso.')
  })


  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  
  cy
    .get('[id="firstName"]')
    .click()
    .type('Nome',{delay:0})
      
  cy
    .get('[id="lastName"]')
    .click()
    .type('Sorenome',{delay:0})
  
  cy
    .get('[id="email"]')
    .click()
    .type('email',{delay:0})
  
  cy
    .get('[id="open-text-area"]')
    .click()
    .type('Reclamação Reclamação Reclamação ',{delay:0})
  
  cy
    .get('[type="submit"]')
    .click()
  
  cy
    .get('[class="error"]')
    .should("be.visible")
    .and('contain', 'Valide os campos obrigatórios!')
  
    
    })

it('exibe campo em branco ao tentar digitar letras no telefone', () => {
  
  cy
    .get('[id="phone"]')
    .click()
    .type('teste',{delay:0})
    .should('be.empty')
      
      })

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  
  cy
    .get('[id="firstName"]')
    .click()
    .type('Nome',{delay:0})
        
  cy
    .get('[id="lastName"]')
    .click()
    .type('Sorenome',{delay:0})
    
  cy
    .get('[id="email"]')
    .click()
    .type('email@emai.com',{delay:0})
    
  cy
    .get('[id="open-text-area"]')
    .click()
    .type('Reclamação Reclamação Reclamação ',{delay:0})
    
  cy
    .get('[ id="phone-checkbox"]')
    .check()

  cy
    .get('[type="submit"]')
    .click()

  cy
    .get('[class="error"]')
    .should("be.visible")
    .and('contain', 'Valide os campos obrigatórios!')   

  })

it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  
  cy
    .get('[id="firstName"]')
    .click()
    .type('Nome',{delay:0})
    .should('have.value','Nome')
    .clear()
    .should('have.value', '')
          
  cy
    .get('[id="lastName"]')
    .click()
    .type('Sobrenome',{delay:0})
    .should('have.value','Sobrenome')
    .clear()
    .should('have.value', '')
      
  cy
    .get('[id="email"]')
    .click()
    .type('email@email.com',{delay:0})
    .should('have.value','email@email.com')
    .clear()
    .should('have.value', '')

  cy
    .get('[id="phone"]')
    .click()
    .type('123456',{delay:0})
    .should('have.value','123456')
    .clear()
    .should('have.value', '')
               
  })

it('seleciona um produto (YouTube) por seu texto', () => {
  cy
    .get('[id="product"]')
    .select('YouTube')
    .should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu indice', () => {
  cy
    .get('[id="product"]')
    .select(3)
    .should('have.value', 'mentoria')
  
})

it('Marca o tipo de atendimento "Feedback"', () => {
  cy
    .get('[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
})

it('Marca todos os checkboxes e desmarca o último', () => {
  cy
    .get('[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
})

it('seleciona um arquivo da pasta fixtures', () => {
  
  cy
  .fixture('example.json')
  .as('teste')
  
  cy
  .get('[id="file-upload"]')
  .selectFile('@teste')
  .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')})
})

it('seleciona um arquivo simulando drag and drop', () => {
  cy
  .get('[id="file-upload"]')
  .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
  .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')})
})

it('verifica se link abre em outra pagina', () => {
  cy
  .get('[href="privacy.html"]')
  .should('have.attr', 'target', '_blank')
  .invoke('removeAttr', 'target')
  .click()
  cy
  .get('[id="white-background"]')
  .should('contain','Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
})

})