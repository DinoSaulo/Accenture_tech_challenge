Feature: Gerenciamento de Usuário e Livros na API DemoQA

  Scenario: Criar um novo usuário com sucesso
    Given que eu envio uma solicitação para criar um usuário com um nome e senha válidos
    Then o status da resposta deve ser 201
    And o corpo da resposta deve conter o ID do usuário gerado

  Scenario: Gerar um token de acesso válido
    Given que eu envio uma solicitação para criar um usuário com um nome e senha válidos
    When eu envio uma solicitação para gerar um token de acesso com as credenciais do usuário
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter um token válido

  Scenario: Confirmar se o usuário está autorizado
    Given que eu envio uma solicitação para criar um usuário com um nome e senha válidos
    When eu envio uma solicitação para gerar um token de acesso com as credenciais do usuário
    Then o status da resposta deve ser 200
    And o corpo da resposta deve indicar que o usuário está autorizado
