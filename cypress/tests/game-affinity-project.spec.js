import { loginRegisterUsers } from '../support/mockdata';
// import { graphqlRegister, graphqlLogin, graphqlLogout } from '../support/commands';

// Mocha (from which Cypress borrows) recommends no arrow functions: https://mochajs.org/#arrow-functions
// Queries can accept a regex to make selectors more resilient to content tweaks and changes (for example, chaging Login to LOGIN in a button label)

describe('Regular user flow', function () {
  before(function () {
    // wipe testing databse before tests
    // this endpoint is enabled only when the backend is running in a test environment
    cy.request('POST', 'http://localhost:4000/api/testing/reset')
  })


  it('general tour', function () {

    cy.visit('/')
    cy.findByRole('link', { name: /home/i }).should('exist')
    cy.findByRole('button', { name: /login/i }).should('exist')
    cy.findByRole('button', { name: /register/i }).should('exist')


    // find by aria role button, using regex exact match /register/ with i flag to ignore case.
    cy.findByRole('button', { name: /register/i }).click()

    // within: https://testing-library.com/docs/dom-testing-library/api-within
    cy.findByRole('dialog').within(() => {
      // cy.findByRole('form').within(() => {

      cy.findByRole('textbox', { name: /email/i }).type(loginRegisterUsers.valid.email)

      // password can't be found by aria role for security reasons, so we can find it by label or some other property
      cy.findByPlaceholderText(/password/i).type(loginRegisterUsers.valid.password)
      cy.findByRole('button', { name: /register/i }).click();
    })

    // Check the new elements that should be visible after authentication:
    cy.findByRole('link', { name: /library/i }).should('exist')
    cy.findByText(loginRegisterUsers.valid.email).should('exist')

    // Search a game
    cy.findByRole('textbox', { name: /search/i }).type('Warcraft')

    // Add games to library
    cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).within(() => {
      cy.findByRole('button', { name: /Add to Library/i }).click()

      // check that the add button is replaced by remove from library:
      cy.findByRole('button', { name: /Remove from Library/i }).should('exist')
    })
    cy.findByRole('link', { name: /World of Warcraft 2004/i }).within(() => {
      cy.findByRole('button', { name: /Add to Library/i }).click()
    })

    // Add and remove different game to/from library
    cy.findByRole('link', { name: /Warcraft III: The Frozen Throne 2003/i }).within(() => {
      cy.findByRole('button', { name: /Add to Library/i }).click()
      cy.findByRole('button', { name: /Remove from Library/i }).click()
    })


    // LIBRARY
    // Navigate to Library
    cy.findByRole('link', { name: /library/i }).click()

    // Check that added games are present and removed game is not:
    cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).should('exist')
    cy.findByRole('link', { name: /World of Warcraft 2004/i }).should('exist')

    // Delete game from library
    cy.findByRole('link', { name: /World of Warcraft 2004/i }).within(() => {
      cy.findByRole('button', { name: /Remove from Library/i }).click()
    })

    // Check that the deleted game does not exist:
    cy.findByRole('link', { name: /World of Warcraft 2004/i }).should('not.exist')


    // GAME PROFILE
    // Open a game profile from library and check address and present elements:
    cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).click()
    cy.url().should('include', '/games/132') // => true
    cy.url().should('eq', 'http://localhost:3000/games/132')
    cy.findByRole('heading', { name: /Warcraft III: Reign of Chaos/i }).should('exist')
    cy.findByText(/Warcraft 3: Reign of Chaos is an RTS made by Blizzard Entertainment./i).should('exist')
    cy.findByRole('radio', { name: /rating-input-thumbs-down/i }).should('exist')
    cy.findByRole('button', { name: /Remove from Library/i }).should('exist')

    // Ratings
    cy.findAllByRole('radio', { hidden: true }).should('not.be.checked')
    cy.findByRole('radio', { name: /rating-input-legendary/i }).click({ force: true }) // Needs to be forced because the radio itself is hidden.
    cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 3) // There should be 3 unchecked rating buttons
    cy.findByRole('radio', { name: /rating-input-legendary/i, hidden: true }).should('be.checked')

    // logout and check that ratings and the library button disappear
    cy.findByRole('button', { name: /logout/i }).click()
    cy.findByRole('radio', { name: /rating/i }).should('not.exist')
    cy.findByRole('button', { name: /Remove from Library/i }).should('not.exist')
    cy.findByRole('heading', { name: /Warcraft III: Reign of Chaos/i }).should('exist')
    cy.findByText(/Warcraft 3: Reign of Chaos is an RTS made by Blizzard Entertainment./i).should('exist')

    // Log back in
    cy.UILogin(loginRegisterUsers.valid.email, loginRegisterUsers.valid.password)

    // Check that previous rating is still marked
    cy.findByRole('radio', { name: /rating-input-legendary/i, hidden: true }).should('be.checked')

    // Remove from library and check that rating disappears and game is not in library:
    cy.findByRole('button', { name: /Remove from Library/i }).click()
    cy.findByRole('radio', { name: /rating-input-legendary/i, hidden: true }).should('not.be.checked')
    cy.findByRole('link', { name: /library/i }).click()
    cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).should('not.exist')
    cy.findByText(/Your library is empty!/i).should('exist')



  })
})

describe('Isolated functionality tests', function () {
  before(function () {
    cy.request('POST', 'http://localhost:4000/api/testing/reset')
  })

  describe('Login form ', function () {
    describe('client validation', function () {
      beforeEach(function () {
        cy.visit('/')
      })

      it('fails with invalid email', function () {
        cy.UILogin(loginRegisterUsers.noAtEmail.email, loginRegisterUsers.noAtEmail.password)
        cy.findByRole('dialog').should('exist')
        cy.findByText(/Enter a valid email/i).should('exist')

        // // Check the HTML5 built in validation pop up: https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-check-that-a-form-s-HTML-form-validation-is-shown-when-an-input-is-invalid
        // cy.get('input:invalid').should('have.length', 1)
        // cy.get('#email').then(($input) => {
        //   expect($input[0].validationMessage).to.contain(`Please include an '@'`)
        // })
      })

      it('fails with no email', function () {
        cy.UILogin(undefined, loginRegisterUsers.valid.password)
        cy.findByRole('dialog').should('exist')
        cy.findByText(/Enter your email/i).should('exist')
      })

      it('fails with too short password', function () {
        cy.UILogin(loginRegisterUsers.valid.email, '1234567')
        cy.findByRole('dialog').should('exist')
        cy.findByText(/Password must have minimum 8 characters/i).should('exist')
      })

      it('fails with too long password', function () {
        cy.UILogin(loginRegisterUsers.valid.email, '12345678901234567890123456789012345678901234567890123456789012345')
        cy.findByRole('dialog').should('exist')
        cy.findByText(/Password cannot exceed 64 characters/i).should('exist')
      })

      it('fails with no password', function () {
        cy.UILogin(loginRegisterUsers.valid.email, undefined)
        cy.findByRole('dialog').should('exist')
        cy.findByText(/Enter your password/i).should('exist')
      })
    })


    describe('server validation', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:4000/api/testing/reset')
        cy.visit('/')
        cy.graphqlRegister(loginRegisterUsers.valid.email, loginRegisterUsers.valid.password)
        cy.graphqlLogout();
      })

      it('fails with unregistered user', function () {
        cy.UILogin(loginRegisterUsers.unregistered.email, loginRegisterUsers.unregistered.password)
        cy.findByRole('dialog').within(() => {
          cy.findByText(/user not found/i).should('exist')
        })
      })

      it('fails with wrong password', function () {
        cy.UILogin(loginRegisterUsers.valid.email, 'wrongpassword')
        cy.findByText(/Incorrect password/i).should('exist')
      })


    })
  })

  describe('Ratings', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:4000/api/testing/reset')
      cy.graphqlRegister(loginRegisterUsers.valid.email, loginRegisterUsers.valid.password)
    })

    describe('In Game Profile', function () {
      beforeEach(function () {
        cy.visit('/games/132')
      })

      it('are initially unchecked (authenticated user)', function () {
        cy.findAllByRole('radio', { hidden: true }).should('not.be.checked')
      })

      it('selected radio is correctly checked', function () {
        cy.findByRole('radio', { name: /rating-input-legendary/i }).click({ force: true })
        cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 3)
        cy.findByRole('radio', { name: /rating-input-legendary/i, hidden: true }).should('be.checked')
      })

      it('rating a game not in library automatically adds it to library', function () {
        cy.findByRole('radio', { name: /rating-input-legendary/i }).click({ force: true })
        cy.findByRole('button', { name: /Remove from Library/i }).should('exist')
      })

      it('removing a rated game from library removes rating', function () {
        cy.findByRole('radio', { name: /rating-input-legendary/i }).click({ force: true })
        cy.findByRole('button', { name: /Remove from Library/i }).click()
        cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 4)
      })

      it('rate, then remove, then rate works correctly', function () {
        cy.findByRole('radio', { name: /rating-input-legendary/i }).click({ force: true })
        cy.findByRole('button', { name: /Remove from Library/i }).click()
        cy.findByRole('radio', { name: /rating-input-legendary/i }).click({ force: true })
        cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 3)
        cy.findByRole('button', { name: /Remove from Library/i }).should('exist')
      })

      it('changing ratings works correctly', function () {
        cy.findByRole('radio', { name: /rating-input-thumbs-down/i }).click({ force: true })
        cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 3)
        cy.findByRole('radio', { name: /rating-input-thumbs-up/i }).click({ force: true })
        cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 3)
        cy.findByRole('radio', { name: /rating-input-great/i }).click({ force: true })
        cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 3)
        cy.findByRole('radio', { name: /rating-input-legendary/i }).click({ force: true })
        cy.findAllByRole('radio', { hidden: true }).not(':checked').should('have.length', 3)
        cy.findByRole('button', { name: /Remove from Library/i }).should('exist')
      })
    })
  })
})


// describe.skip('Checking for unmounted component state update errors', function () {

//   before(function () {
//     // wipe testing databse before tests
//     // this endpoint is enabled only when the backend is running in a test environment
//     cy.request('POST', 'http://localhost:4000/api/testing/reset')
//     cy.visit('/')

//     // Register a new user
//     cy.findByRole('button', { name: /register/i }).click()
//     cy.findByRole('dialog').within(() => {
//       cy.findByRole('textbox', { name: /email/i }).type(loginRegisterUsers.valid.email)
//       cy.findByPlaceholderText(/password/i).type(loginRegisterUsers.valid.password)
//       cy.findByRole('button', { name: /register/i }).click();
//     })
//   })

//   it('Home Login>Logout', function () {


//     cy.visit('/')

//     // Check the new elements that should be visible after authentication:
//     cy.findByRole('link', { name: /library/i }).should('exist')
//     cy.findByText(loginRegisterUsers.valid.email).should('exist')


//     cy.UILogoutAndLogin();


//     // Search a game
//     cy.findByRole('textbox', { name: /search/i }).type('Warcraft')

//     // Add games to library
//     cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).within(() => {
//       cy.findByRole('button', { name: /Add to Library/i }).click()

//       // check that the add button is replaced by remove from library:
//       cy.findByRole('button', { name: /Remove from Library/i }).should('exist')
//     })
//     cy.findByRole('link', { name: /World of Warcraft 2004/i }).within(() => {
//       cy.findByRole('button', { name: /Add to Library/i }).click()
//     })

//     // Add and remove different game to/from library
//     cy.findByRole('link', { name: /Warcraft III: The Frozen Throne 2003/i }).within(() => {
//       cy.findByRole('button', { name: /Add to Library/i }).click()
//       cy.findByRole('button', { name: /Remove from Library/i }).click()
//     })


//     cy.UILogoutAndLogin();


//     // LIBRARY
//     // Navigate to Library
//     cy.findByRole('link', { name: /library/i }).click()
//     cy.url().should('eq', 'http://localhost:3000/library') //


//     // Check that added games are present and removed game is not:
//     cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).should('exist')
//     cy.findByRole('link', { name: /World of Warcraft 2004/i }).should('exist')
//     cy.findByRole('link', { name: /Warcraft III: The Frozen Throne 2003/i }).should('not.exist')

//     // Delete game from library
//     cy.findByRole('link', { name: /World of Warcraft 2004/i }).within(() => {
//       cy.findByRole('button', { name: /Remove from Library/i }).click()
//     })

//     // Check that the deleted game does not exist:
//     cy.findByRole('link', { name: /World of Warcraft 2004/i }).should('not.exist')


//     cy.UILogoutAndLogin();

//     // logout on library should have redirected to home
//     cy.url().should('eq', 'http://localhost:3000/')

//     // Navigate back to library and check that non deleted game is still there
//     cy.findByRole('link', { name: /library/i }).click()
//     cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).should('exist')


//     // Open a game profile from library:
//     cy.findByRole('link', { name: /Warcraft III: Reign of Chaos 2002/i }).click()


//     // GAME PROFILE
//     cy.url().should('include', '/games/132') // => true
//     cy.url().should('eq', 'http://localhost:3000/games/132') //

//     // Remove and re-add game from library
//     cy.findByRole('button', { name: /Remove from Library/i }).click()
//     cy.findByRole('button', { name: /Add to Library/i }).click()

//     cy.UILogoutAndLogin();

//     // Remove game from library and check that it's gone in library:

//   })
// })



// PENDING:

// describe('Exception handling', function () {
//   it('empty library displays proper message', function () {
//     cy.visit('/library')
//   })
// })

// ratings work on games not in library.