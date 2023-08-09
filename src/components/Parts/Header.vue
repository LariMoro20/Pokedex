<template>
  <q-parallax :height="100" :speed="0.5">
    <template v-slot:media>
      <img src="/images/header-bkg.jpg" alt="milky way" />
    </template>
    <img src="/images/logo.png" class="pokemon_logotipo" alt="pokemon logo" />
    <br />
  </q-parallax>
  <div class="col-12 pokemon__text text-center">
    Esta aplicação utiliza a api
    <a href="https://pokeapi.co/" target="_blank">https://pokeapi.co/</a>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'Header'
}
</script>
<style scoped>
.pokemon_card-image {
  height: 250px;
}
.pokemon_logotipo {
  width: 200px;
}
.home-title {
  font-size: 2em;
  line-height: 3rem;
}

.pokemon__text {
  background-color: #17244c;
  color: white;
  font-size: 10px;
}
.pokemon__text a {
  color: white;
}
</style>
