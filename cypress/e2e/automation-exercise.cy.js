/// <reference types="cypress"/>


import userData from '../fixtures/example.json';
import {
    getRandomNumber,
    getRandomEmail
 } from '../support/helpers.js';


import { faker } from '@faker-js/faker';

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

        // Arrange
        
        cy.get('a[href="/login"]').click()
        
        cy.get('[data-qa="signup-name"]').type(`Qa Tester`)
        cy.get('[data-qa="signup-email"]').type(`${getRandomEmail()}`)
        cy.contains('button', 'Signup').click()

        // radio ou checkboxes -> check
        // cy.get('#id_gender1').check()
        cy.get('input[type=radio]').check('Mrs')

        cy.get('input#password').type('123456', {log:false})

        // para comboboxes ou selects -> select
        cy.get('select[data-qa="days"]').select('20')
        cy.get('select[data-qa="months"]').select('September')
        cy.get('select[data-qa="years"]').select('1992')

          // radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        // Act
        cy.get('[data-qa=create-account]').click()

        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

    });
   
    it('Login de usuário com e-mail e senha corretos', () => {

        // Arrange
        
        cy.get('a[href="/login"]').click()
        
  
        cy.get('[data-qa="login-email"]').type(`qa-tester-1761510428263@test.com`)
        cy.get('[data-qa="login-password"]').type(`123456`)

        // Act
        cy.get('[data-qa="login-button"]').click()

        // Assert
        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible')


    });
    


    it('Login de usuário com e-mail e senha incorretos', () => {

        // Arrange
        
        cy.get('a[href="/login"]').click()
        
  
        cy.get('[data-qa="login-email"]').type(`qa-tester-17615@test.com`)
        cy.get('[data-qa="login-password"]').type(`123456abc`)
        // Act
        cy.get('[data-qa="login-button"]').click()

        // Assert
        cy.get('form > p').should('contain', 'Your email or password is incorrect!')



    });

    it('Logout de usuário', () => {

        // Arrange
       
        cy.get('a[href="/login"]').click()
        
  
        cy.get('[data-qa="login-email"]').type(`qa-tester-1761510428263@test.com`)
        cy.get('[data-qa="login-password"]').type(`123456`)

        cy.get('[data-qa="login-button"]').click()

        // Act
        cy.get('a[href="/logout"]').click()

        // Assert
        cy.url().should('contain', 'login')
        cy.get('a[href="/login"]').should('be.visible')

    });


    it('Registrar usuário com email existente', () => {

        // Arrange
        
        cy.get('a[href="/login"]').click()
        
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-1761510428263@test.com`)

        // Act
        cy.contains('button', 'Signup').click()

        // Assert
        cy.get('form > p').should('contain', 'Email Address already exist!')
 

    });

    
    it('Enviar Formulário Contact Us com envio de arquivo', () => {

        // Arrange
       
        cy.get('a[href="/contact_us"]').click()

        cy.get('.contact-form > h2.text-center').should('contain', 'Get In Touch')

        cy.get('input[name="name"]').type(userData.name)
        cy.get('input[type="email"].form-control').type(userData.email)
        cy.get('input[name="subject"]').type(userData.subject)
        cy.get('textarea[name="message"]').type(userData.message)
        

        cy.fixture('example.json').as('arquivo')
  
        // cy.get('input[type=file]').selectFile('@arquivo')
        cy.get('[name="upload_file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        //asserts
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

});