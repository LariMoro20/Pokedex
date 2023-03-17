<template>
  <q-card class="my-card q-pa-sm">
    <div
      class="poke-card"
      v-if="currentPokemon.types"
      :style="'background-color:' + getColor"
    >
      <div
        class="col-md-12 pokemon__card-number flex justify-between items-center"
      >
        <div class="text-h6 text-capitalize q-pa-xs">
          {{ currentPokemon.name }}
        </div>
        <small class="pokemon__card-HP"> HP: {{ currentPokemon.hp }}</small>
      </div>
      <div
        class="text-center pokemon__card-image q-px-lg flex items-center justify-center q-pt-lg"
      >
        <img class="pokemon__card-image-img" :src="currentPokemon.image" />
        <div class="pokemon__skills">
          <div class="pokemon__skills-item">
            Ataque: {{ currentPokemon.attack }}<br />
            Ataque esp.: {{ currentPokemon.special_attack }}
          </div>
          <div class="pokemon__skills-item">
            Defesa: {{ currentPokemon.defense }}<br />
            Defesa esp.: {{ currentPokemon.special_defense }}
          </div>
        </div>
      </div>
      <q-card-section class="text-center">
        <div class="col-md-12 items-center justify-center flex">
          <q-btn label="Detalhes" color="primary" @click="handleOpenDialog" />
        </div>

        <q-dialog
          class="bg-grey-10 text-white q-pa-none"
          v-model="openDialog"
          full-width
          :maximized="maximizedToggle"
          persistent
        >
          <q-card
            class="bg-grey-10 text-white full-height"
            style="width: 100%; max-width: 100vw"
          >
            <q-card-section class="text-center">
              <div class="text-h6 text-capitalize">
                #{{ currentPokemon.id }} {{ currentPokemon.name }}
              </div>
            </q-card-section>

            <q-card-section
              class="q-pt-none scroll full-height flex items-center justify-center"
              style="max-height: 76vh"
            >
              <div class="itemtrst full-width">
                <div class="row">
                  <div class="col-md-12 text-center full-width">
                    <div class="pokemon__modal-image">
                      <img
                        class="pokemon__modal-image-img q-pa-md"
                        :src="currentPokemon.image"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 full-width">
                    <div class="col-md-12 full-width text-center text-h6">
                      HP: {{ currentPokemon.hp }}
                    </div>

                    <div
                      class="row flex q-pa-md bg-black text-white flex-center justify-around"
                    >
                      <div>
                        <span
                          class="pokemon__types-item pokemon__types-item-type bg-primary text-white text-capitalize"
                          v-for="(type, ikey) in currentPokemon.types"
                          :key="ikey"
                        >
                          {{ type.type.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 full-width">
                    <div
                      class="row flex pokemon__modal__skills q-pa-sm bg-black text-white flex-center justify-around"
                    >
                      <div
                        class="col-6 text-center pokemon__modal__skills-item text-capitalize"
                      >
                        Habilidade:
                        <span
                          class="pokemon__types-item text-capitalize"
                          v-for="(hability, ikey) in currentPokemon.abilities"
                          :key="ikey"
                        >
                          {{ hability.ability.name }}
                        </span>
                      </div>
                      <div
                        class="col-6 text-center pokemon__modal__skills-item text-capitalize"
                      >
                        Grupo de ovos:
                        <span
                          class="pokemon__types-item text-capitalize"
                          v-for="(egg, ikey) in currentPokemon.egg_groups"
                          :key="ikey"
                        >
                          {{ egg.name }}
                        </span>
                      </div>
                    </div>

                    <div
                      class="row flex pokemon__modal__skills q-pa-sm bg-black text-white flex-center justify-around"
                    >
                      <div class="pokemon__modal__skills-item">
                        Altura: {{ currentPokemon.height }} m
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Peso: {{ currentPokemon.weight }} kg
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Forma: {{ currentPokemon.shape.name }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Velocidade: {{ currentPokemon.speed }}
                      </div>
                    </div>
                    <div
                      class="row flex pokemon__modal__skills q-pa-sm bg-black text-white flex-center justify-between"
                    >
                      <div class="pokemon__modal__skills-item">
                        Ataque: {{ currentPokemon.attack }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Defesa: {{ currentPokemon.defense }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Ataque esp.: {{ currentPokemon.special_attack }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Defesa esp.: {{ currentPokemon.special_defense }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-actions
              align="right"
              class="bg-grey-10 text-white text-center flex justify-center q-pb-lg"
            >
              <q-btn
                flat
                label="Fechar"
                class="bg-red-10 col-4"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
import api from "../../services/api";

export default {
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  computed: {
    getColor() {
      console.log(this.pokemontypes[this.currentPokemon.types[0].type.name]);
      console.log(this.currentPokemon.types[0].type.name);

      return this.pokemontypes[this.currentPokemon.types[0].type.name];
    },
  },
  data: () => ({
    openDialog: false,
    maximizedToggle: true,
    currentPokemon: {
      id: "",
      name: "",
      shape: "",
      id: "",
      type: "",
    },
    pokemontypes: {
      normal: "#98c84c",
      fire: "#d22f33",
      water: "#00a2de",
      grass: "#99c74c",
      ground: "#eb8b0b",
      flying: "#fff",
      fighting: "#fff",
      poison: "#b377b3",
      electric: "#efea2b",

      rock: "#eb8b0b",
      psychic: "#794e9e",
      ice: "#a8d7f2",
      bug: "#b5d169",
      ghost: "#b380ac",
      steel: "#97a3a9",
      dragon: "#d7ba07",
      dark: "#184f55",
      fairy: "#d75684",
    },

    pokemontypes2: [
      { Normal: "#98c84c" },
      { Fire: "red" },
      "Water",
      "Grass",
      "Flying",
      "Fighting",
      "Poison",
      "Electric",
      "Ground",
      "Rock",
      "Psychic",
      "Ice",
      "Bug",
      "Ghost",
      "Steel",
      "Dragon",
      "Dark",
      "Fairy",
    ],
  }),
  created() {
    this.getPokeByURL();
  },
  watch: {
    url: function () {
      this.getPokeByURL();
    },
  },
  methods: {
    async handleOpenDialog() {
      this.$q.loading.show();
      this.currentPokemon.species_url
        ? (await this.getPokeSpecie(this.currentPokemon.species_url),
          (this.openDialog = !this.openDialog))
        : "";
      this.$q.loading.hide();
    },

    getPokeByURL() {
      api
        .get(this.url)
        .then((response) => {
          this.currentPokemon.name = response.data.name;
          this.currentPokemon.types = response.data.types;
          this.currentPokemon.id = response.data.id;
          this.currentPokemon.abilities = response.data.abilities;
          this.currentPokemon.height = response.data.height / 10;
          this.currentPokemon.weight = response.data.weight / 10;
          this.currentPokemon.base_experience = response.data.base_experience;
          this.currentPokemon.image =
            response.data.sprites.other.dream_world.front_default != null
              ? response.data.sprites.other.dream_world.front_default
              : "/notfound.png";
          //Special stats
          this.currentPokemon.hp = response.data.stats[0].base_stat;
          this.currentPokemon.attack = response.data.stats[1].base_stat;
          this.currentPokemon.defense = response.data.stats[2].base_stat;
          this.currentPokemon.special_attack = response.data.stats[3].base_stat;
          this.currentPokemon.special_defense =
            response.data.stats[4].base_stat;
          this.currentPokemon.speed = response.data.stats[5].base_stat;
          this.currentPokemon.species_url = response.data.species.url;
        })
        .catch(() => {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: `Ops, parece que este não existe..`,
          });
        });
    },
    async getPokeSpecie(url) {
      await api.get(url).then((response) => {
        this.currentPokemon.egg_groups = response.data.egg_groups;
        this.currentPokemon.shape = response.data.shape || "";
        this.currentPokemon.flavor_text_entries =
          response.data.flavor_text_entries;
      });
    },
  },
};
</script>

<style scoped>
.my-card {
  background-color: yellow;
}
.poke-card {
  background-color: #fff;
}
.pokemon__card-image-img {
  height: 143px;
  max-width: 100%;
  transform: scale(1);
}
.pokemon__card-image-img:hover {
  transform: scale(1.1);
}
.pokemon__card-HP {
  padding: 10px;
}
.pokemon__modal-image-img {
  content: "";
  background: url("/pokeball.png") 50% no-repeat;
  background-size: auto;
  background-size: auto;
  background-size: cover;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 180px;
  max-width: 100%;
}
.pokemon__modal-image::before {
  content: "";
  background: url("/pokeball.png") 50% no-repeat;
}
.pokemon__types-item {
  background-color: white;
  color: black;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
}
.pokemon__types-item-type {
  font-size: 1rem;
  padding: 10px;
  margin: 10px;
  color: black;
}
.pokemon__card-image::before {
  content: "";
  background: url("/pokemons/fundo-poke.jpg") 50% no-repeat;
  background-size: cover;
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 87%;
  height: 163px;
  opacity: 1;
  max-width: 100%;
  animation: pulse 1s infinite;
  animation-direction: alternate;
  animation-name: pulse;
  border-radius: 5px;
  border: 3px groove;
}
.pokemon__skills {
  z-index: 1;
  display: flex;
  text-align: initial;
  font-size: 12px;
  margin-top: 26px;
}

.pokemon__skills-item {
  padding: 5px;
}
.pokemon__modal__skills {
  border-top: 2px solid #4713d6;
  margin-bottom: 5px;
  border-bottom: 2px solid #4713d6;
}
.pokemon__modal__skills-item {
  padding: 7px;
  font-size: 1rem;
}
.pokemon__card-number {
  background-color: #c10015;
  border-radius: 0px 18px 0px 21px;
  color: white;
}

@keyframes pulse {
  0% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(125%);
  }
}
</style>
