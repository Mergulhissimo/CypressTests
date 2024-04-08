require('@4tw/cypress-drag-drop')
import 'cypress-file-upload';
import "cypress-real-events";


Cypress.Commands.add('gitLabLogin', (
  
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  ) => {

    cy.visit('localhost/users/sign_in')
    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
    //cy.session(`${user}${Date.now()}`, login, options)
})


Cypress.Commands.add('createGitLabProject', project => {
    cy.visit('localhost/projects/new')
    cy.get('#project_name').type(project.name, {delay:0})
    cy.get('#project_description').type(project.description, {delay:0})
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
})


Cypress.Commands.add('createIssue', (issue, project) => {
  cy.visit(`localhost/${Cypress.env('user_name')}/${project.name}/issues/new`) 
   cy.get('.qa-issuable-form-title').type(issue.title)
   cy.get('.qa-issuable-form-description').type(issue.description)
   cy.contains('Submit issue').click()
})