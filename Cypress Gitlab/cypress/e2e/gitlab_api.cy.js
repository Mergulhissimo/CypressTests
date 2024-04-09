import { faker } from '@faker-js/faker'


describe('Testes de API', () => {

    afterEach(() => {

        cy.api_deleteProjects()
      
      })


  it('Criação de Projeto com Sucesso', () => {

    const project = {
        name: `project-${faker.string.uuid()}`,
        description: faker.lorem.words(10)
    }

    cy.api_createProject(project).then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(project.name)
        expect(response.body.description).to.equal(project.description)
        cy.log(response.body)
      })
  })



  it('Criação de Issue com Sucesso', () => {

    const project = {
        name: `project-${faker.string.uuid()}`,
        description: faker.lorem.words(10)
    }

    const issue = {
        title: `issue-${faker.string.uuid()}`,
        description: faker.lorem.words(3)
          }
    
    cy.api_createProject(project).then(response => {
            const projectId = response.body.id;
            cy.api_createIssue(issue, projectId).then(response => {
               expect(response.status).to.equal(201)
               expect(response.body.title).to.equal(issue.title)
               expect(response.body.description).to.equal(issue.description)
            })
     })
  })    


  it('Criação de label com Sucesso', () => {
    const project = {
        name: `project-${faker.string.uuid()}`,
        description: faker.lorem.words(10)
    }

    const label = {
        name: `label-${faker.string.uuid()}`,
        color: '#ffaabb'
    }

    cy.api_createProject(project).then(response => {
        const projectId = response.body.id;
        cy.api_createLabel(label, projectId).then(response => {
              expect(response.status).to.equal(201);
              expect(response.body.name).to.equal(label.name)
              expect(response.body.color).to.equal(label.color)
        })
    })

  })


  it('Criação de milestone com Sucesso', () => {
    const project = {
        name: `project-${faker.string.uuid()}`,
        description: faker.lorem.words(10)
    }

    const milestone = {
        title: `milestone-${faker.string.uuid()}`,
    }

    cy.api_createProject(project).then(response => {
        const projectId = response.body.id;
        cy.api_createMilestone(milestone, projectId).then(response => {
              expect(response.status).to.equal(201);
              expect(response.body.title).to.equal(milestone.title)
        })
    })

  })


})
