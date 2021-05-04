const {
    trainerEmbed
} = require("../assets/trainerMsg");
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
        this.pokemons.push(arrRandomValue(pokemons))
        console.log(this.pokemons)
    }
    stats(msg) {
        return trainerEmbed(this)
    }
}


module.exports = {
    Trainer
}