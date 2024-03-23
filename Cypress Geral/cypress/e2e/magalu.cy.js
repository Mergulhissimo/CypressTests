Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

/////////////////////////////////////////////////////////

beforeEach(() => {
    cy.clearAllSessionStorage()
    cy.visit('https://www.magazineluiza.com.br/')
  })

 //////////////////////////////////////////////////////// 

  function searchFor(text) {
    cy.get('[data-testid="input-search"]').clear()
    cy.get('[data-testid="input-search"]').type(text)
    cy.get('[data-testid="search-submit"]').click()
  }

  function validateProduct(text) {
    cy.contains('Resultados para '+text,{timeout: 6000, matchCase: false})
  }

  function addProductToCart(){
    cy.get('[data-testid="product-card-container"]').first().click()
    cy.get('[data-testid="bagButton"]',{timeout:6000}).first().click()
  }

 ////////////////////////////////////////////////////////// 

/*it ('Adicionar ao carrinho seguro negado', () => {
    searchFor("Notebook Asus Vivobook Pro 15 Core i9 16GB 512GB")
    validateProduct("noteBOOK asus vivobook pro 15 core i9 16gb 512gb")
    cy.get('[data-testid="product-title"]').first().then(($el) => {
        const productname = $el.text()
        addProductToCart()
        cy.get('[data-testid="dont-want-services"]',{timeout:6000}).click()
        cy.contains(productname)
        cy.get('.BasketItemProduct-quantity-dropdown').should('have.value', '1');
    })
})*/

/*it ('Adicionar ao carrinho com seguro', () => {
    searchFor("notebook asus vivobook pro 15 core i9 16gb 512gb")
    validateProduct("NOtebook ASUs vivobook pro 15 core i9 16gb 512gb")
    cy.get('[data-testid="product-title"]').first().then(($el) => {
        const productname = $el.text()
        addProductToCart()
        cy.get('[data-testid="acquire-services"]',{timeout:6000}).click()
        cy.contains(productname)
        cy.contains('Garantia Estendida de 1 ano')
        cy.get('.BasketItemProduct-quantity-dropdown').should('have.value', '1');
    }) 
})*/


it ('Adicionar produto ao carrinho', () => {
    searchFor("BoLa")
    validateProduct("bola")
    cy.get('[data-testid="product-title"]').first().then(($el) => {
        const productname = $el.text()
        cy.get('[data-testid="price-value"]').first().then(($el) => {
            let productprice = $el.text()
            //productprice = productprice.replace('&nbsp', '')
            productprice = productprice.replace(/\u00a0/g, ' ')            
            addProductToCart()
            cy.contains(productname).should('have.length', 1);
            cy.get(".BasketItemProduct-to").contains(productprice)
            cy.get('.BasketItemProduct-quantity-dropdown').should('have.value', '1');
        })
    })
})

it ('Adicionar dois itens iguais ao carrinho', () => {
    searchFor("bOlA")
    validateProduct("bola")
    cy.get('[data-testid="product-title"]').first().then(($el) => {
        const productname = $el.text()
        addProductToCart()
        cy.get('.CheckoutHeader-logo-icon').first().click()
        searchFor("bola")
        validateProduct("bola")
        addProductToCart()
        cy.contains(productname).should('have.length', 1);
        cy.get('.BasketItemProduct-quantity-dropdown').should('have.value', '1')
        ;
    })
})

it ('Tentar comprar produto inexistente', () => {
    searchFor("ihudfhdshfd")
    cy.contains('Sua busca por "ihudfhdshfd" não encontrou resultado algum :(',{timeout:6000})
})