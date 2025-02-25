
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import messages from '../../fixtures/messages.json'
import jwt from 'jsonwebtoken';

/* global Given, Then, When */
let requestResponse = {}
let userId;
let token;
let username = `${Cypress.env('username')}`

Given("que eu envio uma solicitação para criar um usuário com um nome e senha válidos", () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Account/v1/User`,
      body: {
        userName: username.replace("DATE", Date.now()),
        password: `${Cypress.env('password')}`
      }
    }).then((response) => {
      requestResponse = response
    });
})

Then("o status da resposta deve ser 201", () => {
    expect(requestResponse.status).to.eq(201);
})

Then("o corpo da resposta deve conter o ID do usuário gerado", () => {
    expect(requestResponse.body.userID).to.not.be.null;
})

When("eu envio uma solicitação para gerar um token de acesso com as credenciais do usuário", () => {
  const temp_user = username.replace("DATE", Date.now())
  let requestResponse2
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}/Account/v1/User`,
    body: {
      userName: temp_user,
      password: `${Cypress.env('password')}`
    }
  }).then((response) => {
    //requestResponse = response
  });

  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}/Account/v1/GenerateToken`,
    body: {
      userName: temp_user,
      password: `${Cypress.env('password')}`
    }
  }).then((response) => {
    requestResponse = response
  });
})

Then("o status da resposta deve ser 200", () => {
  expect(requestResponse.status).to.eq(200);
})

Then("o corpo da resposta deve conter um token válido", () => {
  const decoded = jwt.decode(requestResponse.body.token);
  
  expect(decoded).to.not.be.null; // Ensure the token is not null
  expect(decoded).to.have.property('userName'); // Validate 'userName' exists
  expect(decoded).to.have.property('iat'); // Validate issued-at timestamp
})

Then("o corpo da resposta deve indicar que o usuário está autorizado", () => {
  cy.fixture('messages').then((messages) => {
    expect(requestResponse.body.result).to.be.equal(messages.authorized_msg);
    expect(requestResponse.body.status).to.be.equal(messages.success_title_msg);
  })
  
})