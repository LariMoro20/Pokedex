describe('Teste do jogo Descubra o Pokemon', () => {
  let pokemonName = '';
  beforeEach('', () => {
    cy.visit('/game');
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*').as('getPokemon');
    cy.wait('@getPokemon').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      pokemonName = interception.response.body.name.toUpperCase();
    });
  })
  it('Testa ganhar o jogo', () => {
    cy.get('[data-cy=letter-button]').each((button, index) => {
      cy.wrap(button).invoke('text').then(buttonText => {
        let letterPosition = pokemonName
          .toLowerCase()
          .indexOf(buttonText.toLowerCase());

        if (letterPosition >= 0) {
          cy.wrap(button).click();
        }
      });
    });
    cy.get('[data-cy=sucess_message]').should('be.visible')
  });

  it('Testa perder o jogo', () => {
    let errors = 0
    cy.get('[data-cy=letter-button]').each((button, index) => {
      cy.wrap(button).invoke('text').then(buttonText => {
        let letterPosition = pokemonName
          .toLowerCase()
          .indexOf(buttonText.toLowerCase());
        if (letterPosition < 0 && errors < 10) {
          errors++;
          cy.wrap(button).click();
        }
      });
    });
    cy.get('[data-cy=gameover_message]').should('be.visible')
  });
});
