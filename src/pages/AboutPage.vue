<template>
  <q-page class="poke__page q-pa-md container">
    <div class="container q-px-xl">
      <div class="row flex justify-center flex-center column q-pa-lg">
        <div class="col-md-12 q-pb-md">
          <div class="text-h4 text-white">Sobre a aplicação</div>
        </div>
        <div class="col-md-12">
          <div class="text-white q-pb-md">
            Olá, meu nome é Larissa, sou desenvolvedora web e criadora desta
            pokédex! Essa aplicação está sendo desenvolvida para fins de estudo
            e prática de conhecimentos adquidos ao longo do tempo. Aqui você
            poderá ver uma lista de todos os pokemons existentes, suas
            características e habilidades, pesquisar um especifico e até mesmo
            jogar um jogo de descobrir o pokemon.
          </div>
          <div class="text-white q-pb-md">
            A ideia dessa aplicação surgiu quando descobri a
            <a
              href="https://pokeapi.co/"
              class="text-white text-bold poke__link"
              target="_blank"
            >
              PokeAPI <q-icon name="mdi-link" /></a
            >, uma REST API de requisição livre que fornece dados completos
            sobre todos os pokemons, suas habilidades, tipos, imagens, evoluções
            e muitoo mais!
            <br />
            Esta aplicação está em constante crescimento, então de tempos em
            tempos é legal você voltar aqui para ver as novidades hehe. <br />
          </div>
          <div class="text-white text-center">
            Caso seja do seu interesse, deixarei abaixo um botão para o meu
            portifólio para que possa ver os meus outros projetos:
          </div>
          <div class="col-md-12 text-center q-pb-lg">
            <q-btn
              color="primary"
              class="q-ma-md"
              label="Acessar portifólio"
              href="https://larissa-santos.vercel.app/"
              target="_blank"
            />
          </div>
          <div class="text-white text-center">Repostório do projeto</div>
          <div class="col-md-12 text-center">
            <q-btn
              color="grey-10"
              icon="mdi-github"
              label="Ver no github"
              href="https://github.com/LariMoro20/Pokedex"
              target="_blank"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPage',
  data: () => ({})
}
</script>
