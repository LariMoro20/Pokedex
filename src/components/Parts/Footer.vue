<template>
  <footer>
    <div class="row">
      <div class="pokemon_footer col-12 q-py-sm text-center">
        <small>{{ year }} &copy; Lari Moro</small>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    year: new Date().getFullYear()
  })
};
</script>
<style scoped>
.pokemon_footer {
  background-color: #b71c1c;
  color: white;
}
a {
  text-decoration: none;
}
</style>
