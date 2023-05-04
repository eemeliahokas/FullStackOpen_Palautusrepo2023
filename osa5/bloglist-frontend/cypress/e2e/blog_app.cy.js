/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.get('button').click()
      cy.contains('Matti Luukkainen logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('wrongpassword')
      cy.get('button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('Logged in', function() {
    beforeEach(function() {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.get('button').click()
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('Testi')
      cy.get('input[name="Author"]').type('Aku Ankka')
      cy.get('input[name="Url"]').type('www.test.com')
      cy.get('button[type=submit]').contains('create').click()
      cy.contains('a new blog Testi by Aku Ankka added')
      cy.contains('Testi Aku Ankka')
    })
  })

  describe('When a blog is created', function() {
    beforeEach(function async () {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.get('button').click()
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('Testi2')
      cy.get('input[name="Author"]').type('Aku Sorsa')
      cy.get('input[name="Url"]').type('www.testaus.com')
      cy.get('button[type=submit]').contains('create').click()
      cy.contains('a new blog Testi2 by Aku Sorsa added')
      cy.contains('Testi2 Aku Sorsa')
    })

    it('blog can be liked', function() {
      cy.get('button').contains('view').click()
      cy.contains('likes 0')
      cy.get('button').contains('like').click()
      cy.reload()
      cy.get('button').contains('view').click()
      cy.contains('likes 1')
    })


    it('Blog can be deleted', function() {
      cy.get('button').contains('view').click()
      cy.get('button').contains('remove').click()
      cy.reload()
      cy.get('html').should('not.contain', 'Testi Aku Ankka')
    })

  })

})