<template>
  <div>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="text-center">
          <img
            src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo.png"
            class="pokemon_logotipo"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-black"
    >
      <q-list>
        <q-item-label color="red-10" header class="pokemon_menu-header">
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
            <q-icon name="home" color="red" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicial</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          color="red-10"
          clickable
          to="/about"
          v-ripple
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="info" color="red" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          color="red-10"
          clickable
          v-ripple
          to="/notes"
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="sticky_note_2" color="red" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Anotações</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>
<script>
export default {
  name: "MainLayout",
  data: () => ({
    year: new Date().getFullYear(),
    leftDrawerOpen: false
  })
};
</script>

<style scoped>
.pokemon_logotipo {
  width: 150px;
}
.pokemon_menu-header {
  background-color: #b71c1c;
  color: white;
}
.pokemon_menu-item {
  color: black;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2em;
  font-family: "Odibee Sans", cursive;
}
a {
  text-decoration: none;
}
</style>
