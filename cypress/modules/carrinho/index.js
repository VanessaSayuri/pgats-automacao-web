
import { faker } from '@faker-js/faker';

class Carrinho{
    comprarProduto(){
        cy.get('button[class="btn btn-default cart"]').click()
        cy.get('p[class="text-center"] > a[href="/view_cart"]').click()
        cy.get('a[class="btn btn-default check_out"]').click()
        cy.get('a[href="/payment"]').click()
    }

    preencherDadosCartao(card){
        cy.get('input[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('input[data-qa="card-number"]').type(card)
        cy.get('input[data-qa="cvc"]').type(faker.number.int( { min: 100, max:150 } ))
        cy.get('input[data-qa="expiry-month"]').type(faker.number.int( { min: 1, max:12 } ))
        cy.get('input[data-qa="expiry-year"]').type(faker.number.int( { min: 2026, max:2028 } ))
        cy.get('button[data-qa="pay-button"]').click()

    }
}


export default new Carrinho()