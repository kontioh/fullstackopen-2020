/* eslint-disable no-undef */
const user = {
  username: 'einstein',
  name: 'Albert Einstein',
  password: 'password'
}


describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
    cy.contains('Log in').click()
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('einstein')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Albert Einstein logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('einstein')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'einstein', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#author').type('Author A')
      cy.get('#title').type('Title A')
      cy.get('#url').type('www.url.org')
      cy.contains('create').click()
      
      cy.contains('Title A')
      cy.contains('Author A')
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'First title', author: 'Author A', url: 'www.aaa.org', likes: 2 })
        cy.createBlog({ title: 'Second title', author: 'Author B', url: 'www.bbb.org' })
        cy.createBlog({ title: 'Third title', author: 'Author C', url: 'www.ccc.org', likes: 10 })
      })

      it('a blog can be liked', function() {
        cy.get('.blog')
          .contains('Second title').contains('view').click()
          .parent().contains('like').click()
          .parent().contains('Likes: 1')
      })

      it('the adder of a blog can delete it', function() {
        cy.get('.blog')
          .contains('Second title').contains('view').click()
          .parent().contains('remove').click()
          .parent().should('not.contain','Second title')
      })

      it.only('blogs are sorted by likes', function() {
        cy.get('.view-blog-button')
          .then((btns) => {
            cy.wrap(btns[0]).click()
            cy.wrap(btns[1]).click()
            cy.wrap(btns[2]).click()
          })
        
        cy.get('.blog')
          .then((blogs) => {
            cy.wrap(blogs[0]).contains('Likes: 10')
            cy.wrap(blogs[1]).contains('Likes: 2')
            cy.wrap(blogs[2]).contains('Likes: 0')
          })
      })
    })
  })
  
})