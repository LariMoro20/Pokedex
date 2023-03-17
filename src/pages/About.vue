<template>
  <q-page class=" flex-center">
    <q-parallax :height="150" :speed="0.5">
      <template v-slot:media>
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg"
        />
      </template>
      <img
        src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo.png"
        class="pokemon_logotipo"
      />
      <br />
    </q-parallax>
    <div class="q-mx-md q-my-md">
      <div class="row">
        <div class="col-12 col-md-12">
          <h1 class="about-title q-ma-none">Sobre a aplicação</h1>
        </div>
        <div class="col-12 col-md-12">
          <p class="about-text">
            Esta aplicação foi desenvolvida seguindo o estudo da aula "Vuejs e
            Quasar" da Dev2Dev:<br />
            <a
              href="https://youtube.com/playlist?list=PL_E9qsiOi2ASNxKmPfrXAb1FaQRidVWMu"
              >https://youtube.com/playlist?list=PL_E9qsiOi2ASNxKmPfrXAb1FaQRidVWMu</a
            >
          </p>
        </div>
        <div class="col-12 col-md-4 q-px-xs">
          <img
            src="https://i.ytimg.com/vi/JGN8m2zC66w/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC1tWbyVIpdV--GhX7eP3oc-qcasA"
            class="full-width"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PageHome",
  computed: {
    ...mapState("pokemons", ["pokemons"])
  },
  data: () => ({
    text: " "
  }),
  mounted() {
    this.actNamePokemon();
    console.log(this.pokemons);
  },
  methods: {
    ...mapActions("pokemons", ["actNamePokemon"])
  }
};
</script>
<style scoped>
.pokemon_logotipo {
  width: 200px;
}
.about-title {
  font-size: 2em;
  line-height: normal;
}
.about-text {
  font-weight: 100;
}
.about-subtitle {
  font-size: 1em;
  font-weight: 600;
  line-height: 0.5rem;
}
.about-list {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
}
.about-list li {
  display: block;
  list-style-type: none;
  box-sizing: border-box;
}
.about-list li:nth-child(odd) {
  clear: both;
  float: left;
  width: 15%;
}
</style>
