<template>
  <div
    class="flex error_content  flex-center justify-around text-center"
  >
    <div class="p-4">
      <h1 class="error_content-title">404</h1>
      <h4 class="error_content-text">Ops, esta página não existe..</h4>
      <router-link class="menu-link btn error_content-btn" to="/"
        >Voltar para a Página Inicial</router-link
      >
    </div>
  </div>
</template>
<script>
//import axios from 'axios'
export default {};
</script>
<style scoped>

.error_content {
  /* background-image: url(https://www.egeniq.nl/sites/default/files/2020-06/frontend_webdeveloper.jpg);*/
  background-color: black;
  color: white;
  height: 100vh;
  background-attachment: fixed;
  background-size: cover;
}
.error_content-title {
  font-size: 120px;
  padding: 0;
  margin: 0;
}
.error_content-btn {
  background-color: white;
  padding: 10px;
  text-decoration: none;
  border-radius: 20px;
  color: black;
}
</style>
