describe('Blog app', function() {
  beforeEach(function() {

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'newnew',
      username: 'new',
      password: 'salainen'
    }
    const user2 = {
      name: 'oldold',
      username: 'old',
      password: 'salainen'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Blog App')
    cy.contains('login').click()
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  describe('Login attemtt', function() {

    it('user can login', function () {
      cy.contains('login').click()
      cy.get('#username').type('new')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('newnew logged in')
    })

    it('wrong user cannot login', function () {
      cy.contains('login').click()
      cy.get('#username').type('new')
      cy.get('#password').type('joitain')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'newnew logged in')
    })

  })


  describe('when logged in', function() {
    beforeEach(function() {

      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: 'new', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('')
      })


    })

    it('a new blog can be created', function() {
      cy.get('#createToggle').click()
      cy.get('#url').type('a note created by cypress')
      cy.get('#author').type('a note created by cypress')
      cy.get('#title').type('a note created by cypress')
      cy.get('#create').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function(){
        cy.get('#createToggle').click()
        cy.get('#url').type('a note created by cypress')
        cy.get('#author').type('a note created by cypress')
        cy.get('#title').type('a note created by cypress')
        cy.get('#create').click()
        cy.contains('a note created by cypress')
      })

      it('like blog', function() {

        cy.get('#show').click()
        cy.get('#like').click()
        cy.contains('1')
      })

      it('different user deletes', function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
          username: 'old', password: 'salainen'
        }).then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          cy.visit('')

          cy.get('#show').click()
          cy.get('html').should('not.contain', '#remove')
        })
      })

      it('delete blog', function() {

        cy.get('#show').click()
        cy.get('#remove').click()
        cy.get('html').should('not.contain', 'a note created by cypress')
      })
    })
  })



})
