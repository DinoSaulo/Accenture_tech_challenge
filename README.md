# Accenture Desafio Técnico 1

Automação dos testes de serviço API [demoqa.com](https://demoqa.com/swagger/) utilizando Cypress, Node.js, Javascript e Github Actions

A documentação da API encontra-se disponível em [https://demoqa.com/swagger/](https://demoqa.com/swagger/)

##

<!--- Utilizando o exemplos do repositório https://github.com/iuricode/readme-template para esse README.md --->

###  📝 Ferramentas utilizadas
| Linguagem     | Framework          | Ferramenta de Gerenciamento | Sistema Operacional  |
|---------------|--------------------|-----------------------------|----------------------|
| Javascript    | Cypress v10.11.0   | Node v20.17.0               | Ubuntu v24.04        |

## 💻 Pré-requisitos (Execução local)

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Possuir o `Node.js` instalado na versão 20.17.0 ou superior;
* Possuir o `Git` instalado.

## 🚀 Clonar o projeto

Para clonar o projeto, execute o seguinte comando no terminal:


``` bash
git clone https://github.com/DinoSaulo/Accenture_tech_challenge.git
```

## ☕ Executando o projeto

Para executar o projeto basta fazer os seguintes passos:

```bash
cd Accenture_tech_challenge
```

### Executar pela primeira vez

#### Instalar as dependências

```bash
npm install
```

#### 🔥 Execução dos testes

##### Via CLI

```bash
npx cypress run
```
Após a execução do comando os testes serão executados e ao final será exibido o resumo da execução no seguinte formato
```bash
...
(Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        6                                                                                │
  │ Passing:      6                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     7 seconds                                                                        │
  │ Spec Ran:     demoqa.feature                                                                   │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
...
====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  demoqa.feature                           00:07        6        6        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        00:07        6        6        -        -        -
```

##### Via GUI

Execute o comando abaixo para que serja aberto a interface gráfica do Cypress
```bash
npx cypress open
```

###### Passos

1. Clicar no botão "E2E Testing"
2. Clicar no botão "Electron"
3. Clicar no botão "Start E2E Testing in Electron"
4. Clicar em "demoqa.feature"

Após isso a execução dos testes será iniciada como mostrada no vídeo abaixo

![switch_de_testes](/cypress/videos/demoqa.feature.gif "Switch de testes")


##### Via Github Actions

<!--- TODO --->

## 💻 Testes

Atualmente esse projeto possui 6 testes, todos eles estão no arquvo [demoqa.cy.js](./cypress/e2e/demoqa/demoqa.cy.js):

## 📶 Reports

O projeto conta com reports automatizados da execução dos testes. Os reports são feitos utilizando o [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter).
Após cada execução do testes um novo report é gerado.
![test_resport](/cypress/reports/mochawesome_print.png "Report da execução dos testes")

## ❔ Dúvidas

Pode entrar em contato comigo pelo e-mail: saulbpt@gmail.com ou abrir uma issue aqui 😊

