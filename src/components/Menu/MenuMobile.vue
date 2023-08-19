<template>
  <div>
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="!is_show_search"
        />
        <q-toolbar-title class="flex items-center" v-if="!is_show_search">
          <router-link class="flex items-center" to="/">
            <img
              src="/images/logo.png"
              class="pokemon_logotipo"
              alt="pokemon logo"
            />
          </router-link>
        </q-toolbar-title>
        <PokemonSearch @closeSearch="showSearch" />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered class="bg-black">
      <q-list class="bg-black">
        <q-item-label
          color="red-10"
          header
          class="pokemon_menu-header bg-black"
        >
          Menu
        </q-item-label>

        <q-item
          color="red-10"
          clickable
          to="/"
          v-ripple
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="home" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicial</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          color="red-10"
          clickable
          to="/game"
          v-ripple
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="gamepad" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Game</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          color="red-10"
          clickable
          v-ripple
          to="/about"
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="info" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>
<script>
import PokemonSearch from 'src/components/Pokemons/PokemonSearch.vue'
import { Platform } from 'quasar'
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  components: { PokemonSearch },
  name: 'MenuMobile',
  setup () {
    const year = new Date().getFullYear()
    const leftDrawerOpen = ref(false)

    return {
      year,
      leftDrawerOpen,
      isMobile: computed(() => Platform.is.mobile)
    }
  }
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
