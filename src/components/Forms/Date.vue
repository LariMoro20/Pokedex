<template>
  <div class="q-pa-md q-gutter-sm">
      <!--<h3 class="title-date q-ma-none">{{title}}: <small>{{model}}</small></h3>-->
      <q-date
        class="full-width"
        v-model="model"
        :events="events"
        event-color="blue"
        :locale="myLocale"
        mask="DD/MM/YYYY"
      >
      <p>Eventos:<br> {{ events }}</p>
        <q-btn
          class="full-width"
          color="white"
          label="Ver"
          text-color="black"
          @click="setNewDate"
        />
      </q-date>
  </div>
</template>

<script>
import moment from "moment-timezone";
export default {
  name: "DateComponent",
  props: {
    title: {
      type: [String],
      default: "Escolha a data"
    }
  },
  data: () => ({
    model: moment().format("DD/MM/YYYY"),
    myLocale: {},
    events: [ '30/05/2021', '07/06/2021', '06/06/2021' ]
  }),

  created() {
    this.onInit();
  },
  methods: {
    setNewDate() {
      this.$emit("newDate", this.model);
    },
    onInit() {
      const dayOfWeek = {
        fullName: [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado"
        ]
      }
      const months = {
        fullName: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro"
        ]
      }
      const myLocale = {
        firstDayOfWeek: 0,
        months: months.fullName,
        monthsShort: months.fullName.map(item => item.slice(0, 3)),
        days: dayOfWeek.fullName,
        daysShort: dayOfWeek.fullName.map(item => item.slice(0, 3)),
        events: [ '30/05/2021', '07/06/2021', '06/06/2021' ]
      }
      this.myLocale = myLocale
    }
  }
};
</script>
<style scoped>
.title-date{
  font-size: 2em;
  line-height: 3rem;
}
</style>
