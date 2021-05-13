const {
    trainerEmbed
} = require("../assets/trainerMsg");
const {
    Pokemon
} = require("./Pokemon")
const {
    pokemonFormater
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
            var newPokemon = pokemonFormater(this);
            var pokemonsInstance = new Pokemon(newPokemon);

            //let pokemonsInstance = new Pokemon(pokemonName, pokemonStats, pokemonAvatar, pokemonTypes, pokemonOwner);
            this.pokemons.push(pokemonsInstance);
        }
    }
    add(pokemon) {
        this.pokemons.push(pokemon)
    }
    stats(msg) {
        return trainerEmbed(this, msg)
    }
    /*     init() {
            this.pokemons.forEach(p => p.initRandom());
            console.log(this.pokemons)

        } */
    consolePokemons() {
        console.log(this.pokemons)
    }
}




//falta  * pokemon.nature
module.exports = {
    Trainer
}