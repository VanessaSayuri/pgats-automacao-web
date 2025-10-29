class Produto{
    verDetalhesDoPrimeiroProduto(){
        cy.get('a[href="/product_details/1"]').click()
    }

    buscarProduto(produto){
        cy.get('input[id=search_product]').type(produto)
        cy.get('#submit_search').click()

    }
}


export default new Produto()