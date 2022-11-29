// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject = any> {
    login(path?: string, options?: Cypress.VisitOptions,): Chainable<AUTWindow>;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', 
  (path?: string, visitOptions?: Cypress.VisitOptions) => {
    
    const options = {
      method: "POST",
      url: "/api/v1/login",
      body: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD'),
      },
      failOnStatusCode: false,
    };

    return cy.request(options).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Request to get auth token failed, response: ${JSON.stringify(response.body)}`);
      }

      const { id_token: token } = response.body;

      return cy.visit(path || '/', {
        headers: { Authorization: `Bearer: ${token}` },
        ...visitOptions,
      });
    });
  });
  
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
