

class Contato{
    preencherFormularioContato(name, email, subject,message){
        cy.get('.contact-form > h2.text-center').should('contain', 'Get In Touch')

        cy.get('input[name="name"]').type(name)
        cy.get('input[type="email"].form-control').type(email)
        cy.get('input[name="subject"]').type(subject)
        cy.get('textarea[name="message"]').type(message)
        

        cy.fixture('example.json').as('arquivo')
    
        // cy.get('input[type=file]').selectFile('@arquivo')
        cy.get('[name="upload_file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()
    }
    
}


export default new Contato()