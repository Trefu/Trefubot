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
        while (this.pokemons.length < 3) {

            let newPokemon = arrRandomValue(pokemons);
            let pokemonName = newPokemon.name;
            let pokemonAvatar = newPokemon.sprites.front_default;
            let pokemonStats = newPokemon.stats.map(stats => ({
                name: stats.stat.name,
                value: stats.base_stat
            }));
            let pokemonTypes = newPokemon.types.map(t => ({
                name: t.type.name
            }));
            let pokemonOwner = this.name;

            let pokemonsInstance = new Pokemon(pokemonName, pokemonStats, pokemonAvatar, pokemonTypes, pokemonOwner);
            this.pokemons.push(pokemonsInstance);

        }


    }
    stats() {
        return trainerEmbed(this)
    }
}


module.exports = {
    Trainer
}