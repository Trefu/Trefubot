const {
    trainerEmbed
} = require("../assets/trainerMsg");
const {
    Pokemon
} = require("./Pokemon")
const {
    Trainer
} = require("./Trainer")
const {
    arrRandomValue,
    pokemons,
    generateRandomNum
} = require("../utils")


class TrainerBot extends Trainer {
    constructor() {
        super()
        this.name = "bot";
        this.money = 0;
        this.wins = 0;
        this.loses = 0;
        this.pokemons = [];
        this.avatar = "https://w7.pngwing.com/pngs/551/804/png-transparent-discord-logo-avatar-avatar-heroes-logo-discord.png";

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

            let pokemonsInstance = new Pokemon(pokemonName, pokemonStats, pokemonAvatar, pokemonTypes);
            this.pokemons.push(pokemonsInstance);
            console.log(this.pokemons);
        }


    }
    stats(msg) {
        return trainerEmbed(this)
    }
}


module.exports = {
    TrainerBot
}