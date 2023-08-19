describe('Teste página inicial', () => {
  it('Requisição de dados e detalhes dos pokemons', () => {
    cy.visit('/')
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*').as('getPokemons')
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/*').as('getPokemonsSpecies')
    cy.wait(['@getPokemons', '@getPokemonsSpecies'])
    cy.get('[data-cy="pokemons_list"]').should('be.visible')

    cy.get('button[data-cy="pokemon_details"]').eq(0).click()
    cy.get('[data-cy="pokemon_details_modal"]').should('be.visible')
  })
})
