describe('Teste de pesquisa de pokemon', () => {
  it('passes', () => {
    cy.visit('/about')
    cy.get('button[data-cy="pokemon_search_open"]').click()
    cy.get('input[data-cy="pokemon_search_input"]').focus().type('pikachu')
    cy.get('button[data-cy="pokemon_search_button"]').click()
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*').as('getPokemon')
    cy.wait('@getPokemon').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get('div[data-cy="pokemon_search_modal"]').contains("Pokemon encontrado")
  })
})
