import { faker } from '@faker-js/faker'


describe('Testes do GitLab', () => {

  beforeEach(() => {

    cy.gitLabLogin()
      
  })

  afterEach(() => {

    cy.api_deleteProjects()
      
  })

    it('Login com Sucesso', () => {

        cy.get('.qa-user-avatar').should('be.visible')
        
        })

    it('Criar novo projeto', () => {

      const project = {
        name: `project-${faker.string.uuid()}`,
        description: faker.lorem.words(10)
      }
    
        cy.createGitLabProject(project)
    
        cy.url().should('be.equal', `http://localhost/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')

      })
    
    it('Criar nova issue', { env: { snapshotOnly: true } }, () => {

        const issue = {
          title: `issue-${faker.string.uuid()}`,
          description: faker.lorem.words(3)
        }

        const project = {
          name: `project-${faker.string.uuid()}`,
          description: faker.lorem.words(10)
        }
    
        cy.api_createProject(project)

        cy.createIssue(issue, project)

        cy.get('.issue-details')
          .should('contain', issue.title)
          .and('contain', issue.description)

    })


    it('Logout com Sucesso', () => {
        
      cy.get('.qa-user-avatar').click()
      cy.get('[data-qa-selector="sign_out_link"]').click()
      cy.url().should('be.equal', 'http://localhost/users/sign_in')

    })


    it('Acessar tela de cadastro de issue', () => {

    const project = {
        name: `project-${faker.string.uuid()}`,
        description: faker.lorem.words(10)
      }  
        
    cy.api_createProject(project)

    cy.visit('localhost')
    cy.get('[class="project-name"]').first().click()
    cy.get('.qa-issues-item').click()
    cy.get('[id="new_issue_link"]').click()

    })

    it('Adicionar label a issue', () => {

      const project = {
          name: `project-${faker.string.uuid()}`,
          description: faker.lorem.words(10)
        }  

      const issue = {
        title: `issue-${faker.string.uuid()}`,
        description: faker.lorem.words(3)
      }

      const label = {
        name: `label-${faker.string.uuid()}`,
        color: '#ffaabb'
      }

      const user = Cypress.env('user_name')

      cy.api_createProject(project).then(response => {
        const projectName = response.body.name
        const projectId = response.body.id
        cy.api_createIssue(issue, projectId).then(response => {
          const issueId = response.body.iid
          cy.api_createLabel(label, projectId).then(response => {
              cy.visit(`localhost/${user}/${projectName}/issues/${issueId}`)
              cy.get('.qa-edit-link-labels').click()
              cy.contains(label.name).click()
              cy.get('body').click()
              cy.get('.qa-labels-block').should('contain', label.name)
              cy.get('.color-label').should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
          })
        })
      })
    })
})