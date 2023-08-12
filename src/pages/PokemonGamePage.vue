<template>
  <q-page class="poke__page">
    <div class="container q-pa-md">
      <div class="row flex-center">
        <div class="col-md-12 text-center">
          <div class="text-h6 text-white">Quem é esse pokemon?</div>
        </div>
        <div
          class="col-md-3 col-lg-4 col-12 q-px-lg text-center"
          v-if="currentPokemon.image"
        >
          <img
            class="pokemon-img"
            :src="currentPokemon.image"
            :style="'filter: brightness(' + endGame + ');'"
          />
        </div>
        <div class="col-md-12 text-center text-white">
          <div class="row flex q-pa-md text-white flex-center justify-center">
            <div v-for="(type, ikey) in currentPokemon.types" :key="ikey">
              <span
                class="pokemon__types-item pokemon__types-item-type q-pa-sm text-capitalize"
                :style="
                  'background-color:' +
                  getColor(type.type.name).background +
                  '; color:' +
                  getColor(type.type.name).color
                "
                rounded
              >
                {{ type.type.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-12 text-center text-white" v-if="errors < 6">
          <h4 class="q-pa-none q-ma-none">{{ answer.join(' ') }}</h4>
          <p class="q-ma-none q-pa-none" v-if="errors < 6 && endGame != 1">
            Chances: {{ errors }}/6
          </p>
        </div>
        <div class="col-md-10 text-center flex justify-center">
          <div
            class="pokemon__game-keyboard flex"
            v-if="errors < 6 && endGame != 1"
          >
            <q-btn
              color="secondary"
              @click="verifyLetter(letra)"
              class="pokemon__game-keyboard-key text-black"
              v-for="(letra, key) in letters_game"
              :key="key"
              size="sm"
            >
              {{ letra }}
            </q-btn>
          </div>
          <div v-else-if="errors >= 6">
            <div class="text-white q-pt-md">
              <q-separator inset color="white" class="col-md-12" />
              <div class="text-h5 q-pt-md text-bold">GAME OVER</div>
              <div class="text-subtitle1">
                O pokemon era: <br />
                <b class="text-uppercase">{{ currentPokemon.name }}</b>
              </div>
              <q-btn
                color="primary"
                class="q-ma-md"
                label="Jogar de novo?"
                @click="restartGame()"
              />
            </div>
          </div>
          <div v-else>
            <div class="text-white q-pt-md">
              <q-separator inset color="white" class="col-md-12" />
              <div class="text-h5 q-pt-md text-bold">PARABÉNS <br /></div>
              <p class="q-ma-none q-pa-none">Você acertou o pokémon!</p>
              <q-btn
                color="primary"
                class="q-ma-md"
                label="Jogar de novo?"
                @click="restartGame()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
      :duration="800"
    >
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import api from '../services/api'
import { ref } from 'vue'
import { pokemontypes } from 'assets/pokemonTypes'

export default {
  name: 'PokemonPage',
  data: () => ({
    letters_game: ref('abcçdefghijklmnopqrstuvwxyz-'),
    letters: 'abcçdefghijklmnopqrstuvwxyz-',
    answer: ref([]),
    endGame: ref(0),
    errors: ref(0),
    currentPokemon: {
      id: '',
      name: '',
      shape: '',
      id: '',
      type: ''
    },
    pokemontypes
  }),

  async mounted () {
    await this.getAPI()
  },

  methods: {
    getColor (type) {
      console.log(type.toLowerCase())
      let bgcolor = this.pokemontypes[type.toLowerCase()].color
      let color = this.pokemontypes[type.toLowerCase()].textColor
      return {
        background: bgcolor,
        color: color
      }
    },
    verifyLetter (letter) {
      let letter_position = this.currentPokemon.name
        .toLowerCase()
        .indexOf(letter.toLowerCase())
      if (letter_position >= 0 && this.errors < 6) {
        ;[...this.currentPokemon.name.toLowerCase()].forEach((value, key) => {
          if (value === letter) this.answer[key] = value
        })
        this.verifyWinner()
      } else {
        this.errors < 6 ? this.errors++ : ''
        if (this.errors >= 6) this.endGame = 1
      }
      this.letters_game = this.letters_game.replace(letter, '')
    },

    restartGame () {
      this.answer = []
      this.errors = 0
      this.letters_game = this.letters
      this.endGame = 0
      this.getAPI()
    },

    verifyWinner () {
      this.currentPokemon.name.toLowerCase() === this.answer.join('')
        ? (this.endGame = 1)
        : ''
    },

    async getAPI () {
      this.$q.loading.show()
      await api
        .get(
          'https://pokeapi.co/api/v2/pokemon/' +
            Math.floor(Math.random() * 1010)
        )
        .then(async response => {
          this.currentPokemon.name = response.data.name
          this.currentPokemon.name = response.data.name
          this.currentPokemon.types = response.data.types
          this.currentPokemon.id = response.data.id
          this.currentPokemon.abilities = response.data.abilities
          this.currentPokemon.height = response.data.height / 10
          this.currentPokemon.weight = response.data.weight / 10
          this.currentPokemon.base_experience = response.data.base_experience
          this.currentPokemon.image =
            response.data.sprites.other['official-artwork'].front_default !=
            null
              ? response.data.sprites.other['official-artwork'].front_default
              : '/notfound.png'
          //Special stats
          this.currentPokemon.hp = response.data.stats[0].base_stat
          this.currentPokemon.attack = response.data.stats[1].base_stat
          this.currentPokemon.defense = response.data.stats[2].base_stat
          this.currentPokemon.special_attack = response.data.stats[3].base_stat
          this.currentPokemon.special_defense = response.data.stats[4].base_stat
          this.currentPokemon.speed = response.data.stats[5].base_stat
          this.currentPokemon.species_url = response.data.species.url
          this.$q.loading.hide()

          this.answer = Array(this.currentPokemon.name.length).fill('_')
        })
        .catch(e => {
          this.$q.notify({
            type: 'negative',
            position: 'bottom',
            message: `Ops, parece que este não existe..` + e
          })
          this.$q.loading.hide()
        })
    }
  }
}
</script>
<style scoped>
.poke__page {
  background-color: #000 !important;
  background-image: url('/images/bg.jpg');
  background-repeat: repeat;
  background-attachment: fixed;
}

.pokemon-img {
  width: 70%;
}

.pokemon__game-keyboard {
  max-width: 80%;
  justify-content: center;
}

.pokemon__game-keyboard-key {
  margin: 5px;
}
</style>
