class Menu{
    navegarParaLogin(){
        cy.get('a[href="/login"]').click()
    }

    efetuarLogout(){
        cy.get('a[href="/logout"]').click()
    }

    navegarParaContato(){
        cy.get('a[href="/contact_us"]').click()
    }
}


export default new Menu()