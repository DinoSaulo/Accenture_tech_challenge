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

  Scenario: Listar todos os livros disponíveis
    Given que a API está disponível
    When eu envio uma solicitação para listar os livros disponíveis
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter uma lista de livros

  Scenario: Alugar dois livros disponíveis
    Given que o usuário está logado e tem um token de acesso válido
    And que há livros disponíveis na biblioteca
    When eu envio uma solicitação para alugar dois livros específicos
    Then o status da resposta deve ser 201
    And o corpo da resposta deve indicar que os livros foram alugados com sucesso

  Scenario: Listar os detalhes do usuário com os livros escolhidos
    Given que o usuário alugou dois livros
    When eu envio uma solicitação para obter os detalhes do usuário
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter as informações do usuário junto com os livros alugados
