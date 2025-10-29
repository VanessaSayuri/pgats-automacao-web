/// <reference types="cypress"/>


import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail
 } from '../support/helpers.js'


import { faker } from '@faker-js/faker';

// import { navegarParaLogin } from '../modules/menu'
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';
import produto from '../modules/produto';

// import imagem from '../fixtures/imagem-exemplo.png'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    })

    it('Exemplos de Logs', () =>{
        cy.log(`Nome do usuário: ${userData.name}`)
        cy.log(`Email do usuário: ${userData.email}`)

        cy.log(`getRandomNumber: ${getRandomNumber()}`)
        cy.log(`getRandomEmail: ${getRandomEmail()}`)
        cy.log(`faker: ${faker.person.fullName}`)
    })

    it('Test Case 1: Cadastrar usuário', () => {

        menu.navegarParaLogin()

        // preencher o formulário de pré-cadastro
        login.preencherFormularioDePreCadastro()

        // preencher formulário de cadastro completo
        cadastro.preencherFormularioDeCadastroCompleto()

        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

    });
   
    it('Test Case 2: Login de usuário com e-mail e senha corretos', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)

        // Assert
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')


    });
    


    it('Test Case 3: Login de usuário com e-mail e senha incorretos', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, '1560565')

        // Assert
        cy.get('form > p').should('contain', 'Your email or password is incorrect!')

    });

    it('Test Case 4: Logout de usuário', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()

        // Assert
        cy.url().should('contain', 'login')
        cy.get('a[href="/login"]').should('be.visible')

    });


    it('Test Case 5: Registrar usuário com email existente', () => {
        
        menu.navegarParaLogin()
        login.preencherFormularioRegistroExistente(userData.name, userData.user)

        // Assert
        cy.get('form[action="/signup"] > p').should('contain', 'Email Address already exist!')
 
    });

    
    it
    ('Test Case 6: Enviar Formulário Contact Us com envio de arquivo', () => {
       
        menu.navegarParaContato()
        contato.preencherFormularioContato(userData.name, userData.user, userData.subject, userData.message)

        //asserts
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

    it('Test Case 8: Verificar todos os produtos e a página de detalhes do produto', () => {
       
        menu.navegarParaProdutos()

        //asserts
        cy.get('h2.title.text-center').should('have.text', 'All Products')

        produto.verDetalhesDoPrimeiroProduto()

        //asserts
        cy.url().should('contain', 'product_details')

        cy.get('.product-information').children().should('contain', 'Category')
        cy.get('.product-information').children().should('contain', 'Availability')
        cy.get('.product-information').children().should('contain', 'Condition')
        cy.get('.product-information').children().should('contain', 'Brand')
         
    });

    it('Test Case 9: Buscar produto', () => {
       
        menu.navegarParaProdutos()
        produto.buscarProduto('top')

        //asserts
        cy.url().should('contain', 'search')
        cy.get('h2.title.text-center').should('have.text', 'Searched Products')
         
    });


    it('Test Case 10: Verificar assinatura na home page', () => {

        contato.preencherSubscription(userData.email)

        // Assert
        cy.get('.alert-success').should('be.visible')
        cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')

    });

});