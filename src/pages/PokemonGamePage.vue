<template>
  <q-page class="poke__page flex flex-center">
    <div class="container q-pa-lg">
      <div
        class="row flex-center column"
        v-if="!request_error && currentPokemon.image"
      >
        <div class="col-md-12 text-center">
          <div class="text-h6 text-white text-bold">Quem é esse pokemon?</div>
        </div>
        <div class="col-md-12 text-center" v-if="points">
          <div class="text-white user__points">Seus acertos: {{ points }}</div>
        </div>
        <div
          class="col-md-3 col-lg-12 col-12 q-px-lg text-center"
          v-if="currentPokemon.image"
        >
          <img
            class="pokemon-img"
            :src="currentPokemon.image"
            :style="'filter: brightness(' + endGame + ');'"
          />
        </div>
        <div class="col-12 text-center text-white">
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
        <div class="col-12 text-center text-white" v-if="!lose_game">
          <h4 class="q-pa-none q-ma-none">{{ answer.join(' ') }}</h4>
          <p class="q-ma-none q-pa-none" v-if="!lose_game && endGame != 1">
            Chances: {{ errors }}/10
          </p>
        </div>
        <div class="col-md-10 col-12 text-center flex justify-center">
          <div
            class="pokemon__game-keyboard flex"
            v-if="!lose_game && endGame != 1"
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
          <div v-else-if="lose_game">
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
                label="Jogar de novo"
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
                label="Jogar de novo"
                @click="restartGame()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-center column text-center" v-if="request_error">
        <img
          class="pokemon__notfound"
          src="images/pokemons/not_found_pikachu.png"
        />
        <div class="text-white text-h5">
          Poxa, o game parece estar com problemas no momento. <br />
          Que tal voltar mais tarde?
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from '../services/api'
import { ref } from 'vue'
import { pokemontypes } from 'src/constants/pokemonTypes'

export default {
  name: 'PokemonPage',
  data: () => ({
    letters_game: ref('abcçdefghijklmnopqrstuvwxyz'),
    letters: 'abcçdefghijklmnopqrstuvwxyz',
    answer: ref([]),
    lose_game: ref(false),
    endGame: ref(0),
    errors: ref(0),
    points: ref(0),
    request_error: false,
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
    if (!localStorage.getItem('pokedex_game_points'))
      localStorage.setItem('pokedex_game_points', 0)
    this.points = localStorage.getItem('pokedex_game_points')
  },

  methods: {
    async getAPI () {
      this.$q.loading.show({
        message: 'Carregando o game..'
      })
      await api
        .get(
          'https://pokeapi.co/api/v2/pokemon/' +
            Math.floor(Math.random() * 1010)
        )
        .then(async response => {
          this.currentPokemon.name = response.data.name
          this.currentPokemon.types = response.data.types
          this.currentPokemon.id = response.data.id
          this.currentPokemon.image =
            response.data.sprites.other['official-artwork'].front_default !=
            null
              ? response.data.sprites.other['official-artwork'].front_default
              : '/notfound.png'
          this.$q.loading.hide()
          this.answer = Array(this.currentPokemon.name.length).fill('_')
          ;[...this.currentPokemon.name.toLowerCase()].forEach((value, key) => {
            if (value === '-') this.answer[key] = value
          })
          this.request_error = false
        })
        .catch(e => {
          this.$q.loading.hide()
          this.request_error = true
        })
    },

    getColor (type) {
      let pokemonType = this.pokemontypes[type.toLowerCase()]
      let bgcolor = pokemonType.color
      let color = pokemonType.textColor
      return {
        background: bgcolor,
        color: color
      }
    },

    verifyLetter (letter) {
      let letter_position = this.currentPokemon.name
        .toLowerCase()
        .indexOf(letter.toLowerCase())
      if (letter_position >= 0 && this.errors < 10) {
        ;[...this.currentPokemon.name.toLowerCase()].forEach((value, key) => {
          if (value === letter) this.answer[key] = value
        })
        this.verifyWinner()
      } else {
        this.errors < 10 ? this.errors++ : ''
        if (this.errors >= 10) {
          this.endGame = 1
          this.lose_game = true
        }
      }
      this.letters_game = this.letters_game.replace(letter, '')
    },

    verifyWinner () {
      this.currentPokemon.name.toLowerCase() === this.answer.join('')
        ? (this.setPoints(), (this.lose_game = false))
        : ''
    },

    setPoints () {
      this.endGame = 1
      let point = localStorage.getItem('pokedex_game_points')
      localStorage.setItem('pokedex_game_points', parseInt(point) + 1)
      this.points = localStorage.getItem('pokedex_game_points')
    },

    restartGame () {
      this.answer = []
      this.lose_game = false
      this.errors = 0
      this.letters_game = this.letters
      this.endGame = 0
      this.getAPI()
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
.pokemon__notfound {
  width: 50%;
}
.pokemon-img {
  height: 220px;
}

.pokemon__game-keyboard {
  max-width: 80%;
  justify-content: center;
}
.user__points {
  font-size: 12px;
}
.pokemon__game-keyboard-key {
  margin: 5px;
}
</style>
