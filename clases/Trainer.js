const {
    trainerEmbed
} = require("../assets/trainerMsg");
const {
    Pokemon
} = require("./Pokemon")
const {
    arrRandomValue,
    pokemons
} = require("../utils")


class Trainer {
    constructor(name, avatar) {
        this.name = name;
        this.money = 0;
        this.wins = 0;
        this.loses = 0;
        this.pokemons = [];
        this.avatar = avatar;

    }
    randomPokemons() {
        if (this.pokemons.length >= 3) return console.log(`${this.name} tiene 3 pokemons`)
        let newPokemon = arrRandomValue(pokemons);
        console.log(newPokemon)
        let pokemonName = newPokemon.name;
        let pokemonAvatar = newPokemon.sprites.front_default;
        let pokemonStats = newPokemon.stats.map(stats => ({
            name: stats.stat.name,
            value: stats.base_stat
        }));
        let pokemonsInstance = new Pokemon(pokemonName, pokemonStats, pokemonAvatar)
        this.pokemons.push(pokemonsInstance);
        console.log(this.pokemons)
    }
    stats(msg) {
        return trainerEmbed(this)
    }
}


module.exports = {
    Trainer
}