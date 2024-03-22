JUST A BUNCH OF RANDOM INFORMATION ABOUT PLUGGINS




https://github.com/4teamwork/cypress-drag-drop

In your Cypress spec use the command as follows:

describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').drag('.targetitem')
  })
})
Pass the options as an object in the second paramteter.

describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('/yourpage')

    cy.get('.sourceitem').drag('.targetitem', options)
  })
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://github.com/abramenal/cypress-file-upload

cySubject.attachFile(fixture, optionalProcessingConfig);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.npmjs.com/package/cypress-plugin-xhr-toggle

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://github.com/dmtrKovalenko/cypress-real-events

cy.get("button").realClick();
cy.get("button").realClick(options);

cy.get("button").realHover();
cy.get("button").realHover(options);

cy.realPress("Tab"); // switch the focus for a11y testing
cy.realPress(["Alt", "Meta", "P"]); // Alt+(Command or Control)+P

cy.get("button").realTouch();
cy.get("button").realTouch(options);

cy.realType("type any text"); // type any text on the page

cy.get("input").focus();
cy.realType("some text {enter}"); // type into focused field

cy.get(".element").realSwipe("toLeft"); // swipes from right to left
cy.get(".element").realSwipe("toRight"); // inverted

cy.get("button").realMouseDown();
cy.get("button").realMouseDown(options);

cy.get("button").realMouseUp();
cy.get("button").realMouseUp(options);

cy.get("sector").realMouseMove(x, y);
cy.get("sector").realMouseMove(x, y, options);

cy.get("div").realMouseWheel(options);

