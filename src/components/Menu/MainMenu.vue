<template>
  <div>
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="flex items-center">
          <router-link class="flex items-center" to="/">
            <img
              src="/images/logo.png"
              class="pokemon_logotipo"
              alt="pokemon logo"
            />
          </router-link>
        </q-toolbar-title>

        <PokemonSearch />
        <q-btn
          icon="home"
          class="q-mr-xs"
          color="grey-10"
          to="/"
          label="Inicial"
        />
        <q-btn color="grey-10" icon="gamepad" label="Game" to="/game" />
        <q-btn color="grey-10" icon="info" label="Sobre" to="/about" />
      </q-toolbar>
    </q-header>
  </div>
</template>
<script>
import PokemonSearch from 'src/components/Pokemons/PokemonSearch.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { PokemonSearch },
  name: 'MainMenu',
  setup () {}
})
</script>

<style scoped>
.pokemon_logotipo {
  width: 150px;
}

.pokemon_menu-item {
  color: black;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2em;
  font-family: 'Odibee Sans', cursive;
}
.pokemon_logotipo {
  width: 100px;
}
a {
  text-decoration: none;
}
</style>
