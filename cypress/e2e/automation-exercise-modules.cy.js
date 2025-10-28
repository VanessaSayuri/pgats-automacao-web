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
import contato from '../modules/contato/index.js';

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

    it('Cadastrar usuário', () => {

        menu.navegarParaLogin()

        // preencher o formulário de pré-cadastro
        login.preencherFormularioDePreCadastro()

        // preencher formulário de cadastro completo
        cadastro.preencherFormularioDeCadastroCompleto()

        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

    });
   
    it('Login de usuário com e-mail e senha corretos', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)

        // Assert
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')


    });
    


    it('Login de usuário com e-mail e senha incorretos', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, '1560565')

        // Assert
        cy.get('form > p').should('contain', 'Your email or password is incorrect!')

    });

    it('Logout de usuário', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()

        // Assert
        cy.url().should('contain', 'login')
        cy.get('a[href="/login"]').should('be.visible')

    });


    it('Registrar usuário com email existente', () => {
        
        menu.navegarParaLogin()
        login.preencherFormularioRegistroExistente(userData.name, userData.user)

        // Assert
        cy.get('form[action="/signup"] > p').should('contain', 'Email Address already exist!')
 
    });

    
    it
    ('Enviar Formulário Contact Us com envio de arquivo', () => {
       
        menu.navegarParaContato()
        contato.preencherFormularioContato(userData.name, userData.user, userData.subject, userData.message)

        //asserts
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

});