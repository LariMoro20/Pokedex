describe('Teste de jogo da forca', () => {
  it('Testa o jogo', () => {
    let pokemonName = 'testes';
    cy.visit('/game'); // Substitua pela URL da sua página, se necessário
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*').as('getPokemon');
    cy.wait('@getPokemon').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      pokemonName = interception.response.body.name.toUpperCase();
      cy.log(pokemonName);
    });

    cy.get('[data-cy=letter-button]').each((button, index) => {
      cy.wait(500);
      cy.wrap(button).invoke('text').then(buttonText => {
        let letterPosition = pokemonName
          .toLowerCase()
          .indexOf(buttonText.toLowerCase());

        if (letterPosition >= 0) {
          cy.wrap(button).click();
        }
      });
    });
  });
});
