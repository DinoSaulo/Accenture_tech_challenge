/// <reference types="cypress" />

describe('Desafio API do Demoqa.com', () => {
  
  let userId;
  let token;
  let username = `${Cypress.env('username')}`
  username = username.replace("DATE", Date.now())

  it('Criar um novo usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Account/v1/User`,
      body: {
        userName: username,
        password: `${Cypress.env('password')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.userID;
    });
  });

  it('Gerar um token de acesso válido', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Account/v1/GenerateToken`,
      body: {
        userName: username,
        password: `${Cypress.env('password')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.exist;
      token = response.body.token;
    });
  });

  it('Confirmar se o usuário está autorizado', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Account/v1/Authorized`,
      body: {
        userName: username,
        password: `${Cypress.env('password')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.true;
    });
  });

  it('Listar todos os livros disponíveis', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/BookStore/v1/Books`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.books).to.be.an('array').that.is.not.empty;
    });
  });

  it('Alugar dois livros disponíveis', () => {
    cy.request('GET', `${Cypress.config().baseUrl}/BookStore/v1/Books`).then((response) => {
      const books = response.body.books;
      const book1 = books[0].isbn;
      const book2 = books[1].isbn;

      cy.request({
        method: 'POST',
        url: `${Cypress.config().baseUrl}/BookStore/v1/Books`,
        headers: { Authorization: `Bearer ${token}` },
        body: {
          userId: userId,
          collectionOfIsbns: [{ isbn: book1 }, { isbn: book2 }]
        }
      }).then((res) => {
        expect(res.status).to.eq(201);
      });
    });
  });

  it('Listar os detalhes do usuário com os livros alugados', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.config().baseUrl}/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.books).to.be.an('array').that.has.length(2);
    });
  });

});
