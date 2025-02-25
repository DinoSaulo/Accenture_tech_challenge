
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import AccountRoutes from '../routes/AccountRoutes'
import BookStoreRoutes from '../routes/BookStoreRoutes'
import jwt from 'jsonwebtoken';

const accountRoutes = new AccountRoutes();
const bookStoreRoutes = new BookStoreRoutes();

/* global Given, Then, When */
let requestResponse = {}
let userId;
let token;
let books;
let username = `${Cypress.env('username')}`

// =====================================
// 🔹 FUNÇÕES GENÉRICAS
// =====================================

Then("o status da resposta deve ser {string}", (accountRoutes) => {
  expect(requestResponse.status).to.eq(parseInt(accountRoutes));
})

// =====================================
// 🔹 FUNÇÕES DO PRIMEIRO SCENARIO
// =====================================

Given("que eu envio uma solicitação para criar um usuário com um nome e senha válidos", () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}${accountRoutes.post_createUser()}`,
      body: {
        userName: username.replace("DATE", Date.now()),
        password: `${Cypress.env('password')}`
      }
    }).then((response) => {
      requestResponse = response
    });
})


Then("o corpo da resposta deve conter o ID do usuário gerado", () => {
    expect(requestResponse.body.userID).to.not.be.null;
})

// =====================================
// 🔹 FUNÇÕES DO SEGUNDO SCENARIO
// =====================================

When("eu envio uma solicitação para gerar um token de acesso com as credenciais do usuário", () => {
  const temp_user = username.replace("DATE", Date.now())
  let requestResponse2
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${accountRoutes.post_createUser()}`,
    body: {
      userName: temp_user,
      password: `${Cypress.env('password')}`
    }
  })

  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${accountRoutes.post_generateToken()}`,
    body: {
      userName: temp_user,
      password: `${Cypress.env('password')}`
    }
  }).then((response) => {
    requestResponse = response
  });
})

Then("o corpo da resposta deve conter um token válido", () => {
  const decoded = jwt.decode(requestResponse.body.token);
  
  expect(decoded).to.not.be.null; // Ensure the token is not null
  expect(decoded).to.have.property('userName'); // Validate 'userName' exists
  expect(decoded).to.have.property('iat'); // Validate issued-at timestamp
})

// =====================================
// 🔹 FUNÇÕES DO TERCEIRO SCENARIO
// =====================================

Then("o corpo da resposta deve indicar que o usuário está autorizado", () => {
  cy.fixture('messages').then((messages) => {
    expect(requestResponse.body.result).to.be.equal(messages.authorized_msg);
    expect(requestResponse.body.status).to.be.equal(messages.success_title_msg);
  })
})

// =====================================
// 🔹 FUNÇÕES DO QUARTO SCENARIO
// =====================================

Given("que a API está disponível", () => {})

When("eu envio uma solicitação para listar os livros disponíveis", () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}${bookStoreRoutes.get_books()}`,
  }).then((response) => {
    requestResponse = response
  });
})

Then("o corpo da resposta deve conter uma lista de livros", () => {
  expect(requestResponse.body.books).to.be.an('array').that.is.not.empty;
})

// =====================================
// 🔹 FUNÇÕES DO QUINTO SCENARIO
// =====================================

Given("que o usuário está logado e tem um token de acesso válido", () => {
  const temp_user = username.replace("DATE", Date.now())
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${accountRoutes.post_createUser()}`,
    body: {
      userName: temp_user,
      password: `${Cypress.env('password')}`
    }
  }).then((response) => {
    userId = response.body.userID
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}${accountRoutes.post_generateToken()}`,
      body: {
        userName: temp_user,
        password: `${Cypress.env('password')}`
      }
    }).then((response) => {
      token = response.body.token
    });
  });
})

Given("que há livros disponíveis na biblioteca", () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}${bookStoreRoutes.get_books()}`,
  }).then((response) => {
    expect(response.body.books).to.be.an('array').that.is.not.empty;
    books = response.body.books
  });
})

Given("eu envio uma solicitação para alugar dois livros específicos", () => {
  const book1 = books[0].isbn;
  const book2 = books[1].isbn;
  
  cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${bookStoreRoutes.post_books()}`,
    headers: { Authorization: `Bearer ${token}` },
    body: {
      userId: userId,
      collectionOfIsbns: [{ isbn: book1 }, { isbn: book2 }]
    }
  }).then((request) => {
    requestResponse = request
  });

})

Then("o corpo da resposta deve indicar que os livros foram alugados com sucesso", () => {
  expect(requestResponse.body.books).to.be.an('array').that.is.not.empty;
  expect(requestResponse.body.books).to.have.length(2);
  expect(requestResponse.body.books[0].isbn).to.be.equals(books[0].isbn);
  expect(requestResponse.body.books[1].isbn).to.be.equals(books[1].isbn);
})

// =====================================
// 🔹 FUNÇÕES DO SEXTO SCENARIO
// =====================================

Given("que o usuário alugou dois livros", () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}${bookStoreRoutes.get_books()}`,
  }).then((response) => {
    expect(response.body.books).to.be.an('array').that.is.not.empty;
    books = response.body.books
  });

  const temp_user = username.replace("DATE", Date.now())
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}${accountRoutes.post_createUser()}`,
    body: {
      userName: temp_user,
      password: `${Cypress.env('password')}`
    }
  }).then((response) => {
    userId = response.body.userID
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}${accountRoutes.post_generateToken()}`,
      body: {
        userName: temp_user,
        password: `${Cypress.env('password')}`
      }
    }).then((response) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.config().baseUrl}${bookStoreRoutes.post_books()}`,
        headers: { Authorization: `Bearer ${response.body.token}` },
        body: {
          userId: userId,
          collectionOfIsbns: [{ isbn: books[0].isbn }, { isbn: books[1].isbn }]
        }
      }).then((request) => {
        requestResponse = request
        token = response.body.token
      });
    });
  });
})

When("eu envio uma solicitação para obter os detalhes do usuário", () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config().baseUrl}${accountRoutes.get_user(userId)}`,
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    requestResponse = response
  });
})

Then("o corpo da resposta deve conter as informações do usuário junto com os livros alugados", () => {
  expect(requestResponse.body.books).to.be.an('array').that.is.not.empty;
  expect(requestResponse.body.books).to.have.length(2);
  expect(requestResponse.body.books[0].isbn).to.be.equals(books[0].isbn);
  expect(requestResponse.body.books[1].isbn).to.be.equals(books[1].isbn);
})