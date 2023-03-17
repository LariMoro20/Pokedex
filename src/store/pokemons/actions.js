import axios from 'axios'
import api from "../../services/api";

const actNamePokemon = async({ commit }) => {
    let pokemons = {}
    if (localStorage.getItem('pokemons') != 'undefined') {
        pokemons = JSON.parse(localStorage.getItem('pokemons'))
    }
    if (pokemons === null) {
        await api.get('/pokemon/?offset=0&limit=100')
            .then(response => {
                pokemons = response.data.results
                localStorage.setItem('pokemons', JSON.stringify(pokemons))
            })
            .catch(error => {
                console.log(error)
            });
    }
    commit('SET_POKEMON', pokemons)
    return pokemons
}

export {
    actNamePokemon
}