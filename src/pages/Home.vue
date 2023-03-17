<template>
  <q-page class=" flex-center">
    <Header />
    <div class="row">
      <div class="col-12 col-md-4">
        <date @newDate="changeDate" />
      </div>
      <div class="col-12 col-md-8">
        <div class="row">
          <div class="col-12 col-md-12">
            <q-tab-panels
              v-model="todayDate"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="30/05/2021">
                <div class="text-h4 q-mb-md">30/05/2021</div>
                <p class="q-ma-none q-pa-none">
                  Descrição do evento exemplo um. Amet consectetur adipisicing
                  elit. Quis praesentium cumque magnam odio iure quidem, quod
                  illum numquam possimus obcaecati commodi minima assumenda
                  consectetur culpa fuga nulla ullam. In, libero.
                </p>
              </q-tab-panel>

              <q-tab-panel name="07/06/2021">
                <div class="text-h4 q-mb-md">07/06/2021</div>
                <p>
                  Descrição do evento exemplo dois. Quod illum numquam possimus
                  obcaecati commodi minima assumenda consectetur culpa fuga
                  nulla ullam. In, libero.
                </p>
              </q-tab-panel>

              <q-tab-panel name="06/06/2021">
                <div class="text-h4 q-mb-md">06/06/2021</div>
                <p>
                  Descrição do evento exemplo tres. Magnam odio iure quidem,
                  quod illum numquam possimus obcaecati commodi minima assumenda
                  consectetur culpa fuga nulla ullam. In, libero.
                </p>
              </q-tab-panel>
            </q-tab-panels>
          </div>
          <div class="col-12 col-md-12">
            <text-component title="" @newItem="saveEvent" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from "moment-timezone";
import TextComponent from "src/components/Forms/TextComponent.vue";
import Header from "src/components/Parts/Header.vue";
import Date from "src/components/Forms/Date.vue";
export default {
  components: {
    Date,
    TextComponent,
    Header
  },
  name: "PageHome",
  data: () => ({
    todayDate: moment().format("DD/MM/YYYY"),
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac purus fermentum, maximus eros sed, ultricies enim. Aenean sagittis nibh eros. Curabitur tincidunt ac ligula id porta. Sed ut ligula velit. Praesent a pulvinar erat. Sed id dapibus odio. Aenean quis ullamcorper leo. Donec semper nisi nec molestie laoreet. Duis vestibulum mauris non porttitor vulputate. Nunc id est varius, dignissim magna at, pellentesque urna. Integer cursus sagittis justo, at suscipit lorem rutrum vel. Etiam malesuada arcu a lectus porttitor, eu feugiat purus convallis. Nullam interdum mauris eu metus pharetra, sed mattis massa pretium. Suspendisse euismod velit eget sagittis congue.Integer quis rutrum lectus, at sagittis mi. Sed eget enim fermentum. ",
    text2:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac purus fermentum, maximus eros sed, ultricies enim. Aenean sagittis nibh eros. Curabitur tincidunt ac ligula id porta. Sed ut ligula velit. Praesent a pulvinar erat. Sed id dapibus odio. Aenean quis ullamcorper leo. Donec semper nisi nec molestie laoreet. Duis vestibulum mauris non porttitor vulputate. Nunc id est varius, dignissim magna at, pellentesque urna. Integer cursus sagittis justo, at suscipit lorem rutrum vel. Etiam malesuada arcu a lectus porttitor, eu feugiat purus convallis. Nullam interdum mauris eu metus pharetra, sed mattis massa pretium. Suspendisse euismod velit eget sagittis congue.Integer quis rutrum lectus, at sagittis mi. Sed eget enim fermentum, varius quam nec, bibendum mi. Sed at ex diam. Vivamus nec sodales libero."
  }),
  mounted() {
    this.$notify.success("Aplicação carregada");
  },
  methods: {
    changeDate(value) {
      this.todayDate = value;
    }
  },
  saveEvent(value) {
    alert(value);
  }
};
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
</style>
