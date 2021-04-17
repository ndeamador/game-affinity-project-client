// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'; // https://testing-library.com/docs/cypress-testing-library/intro/


// UI Login, Logout and Register
// ===========================================================================================
Cypress.Commands.add('UILogin', function (username, password) {
  cy.findByRole('button', { name: /login/i }).click()
  cy.findByRole('dialog').within(() => {
    username && cy.findByRole('textbox', { name: /email/i }).type(username)
    password && cy.findByPlaceholderText(/password/i).type(password)
    cy.findByRole('button', { name: /login/i }).click();
  })
})

Cypress.Commands.add('UIRegister', function (username, password) {
  cy.findByRole('button', { name: /register/i }).click()
  cy.findByRole('dialog').within(() => {
    username && cy.findByRole('textbox', { name: /email/i }).type(username)
    password && cy.findByPlaceholderText(/password/i).type(password)
    cy.findByRole('button', { name: /register/i }).click();
  })
})

// GraphQL Requests to bypass the UI when needed.
// ===========================================================================================

function baseCyRequest(query) {
  cy.request(
    {
      method: 'POST',
      url: 'http://localhost:4000/graphql/',
      body: { query },
      failOnStatusCode: false
    }
  ).then((res) => {
    cy.log(res.body);
  })
}

Cypress.Commands.add('graphqlRegister', function (email, password) {
  const query = `
    mutation {
      registerNewUser(loginDetails:{email:"${email}", password:"${password}"}) {
        id
        email
      }
    }
  `
  baseCyRequest(query);
})

Cypress.Commands.add('graphqlLogin', function (email, password) {
  const query = `
    mutation {
      login(loginDetails:{email:"${email}", password:"${password}"}) {
        id
        email
      }
    }
  `
  baseCyRequest(query);
})

Cypress.Commands.add('graphqlLogout', function () {
  const query = `
    mutation {
      logout
    }
  `
  baseCyRequest(query);
})
