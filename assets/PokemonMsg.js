const Discord = require('discord.js');
const {
    EMOJIS_TYPES
} = require("../utils")
const {
    printPokemonsStats
} = require("../utils")

const pokemonEmbed = (pokemon, msg) => {

    const typeTxt = pokemon.types.map(t => `${t.name.toUpperCase()} ${EMOJIS_TYPES[t.name]}`);

    var embedDatos = new Discord.MessageEmbed()
        .setThumbnail(pokemon.avatar)
        .setColor(0x00AE86)
        .setTitle(`Stats from ${pokemon.name.toUpperCase()} owned by ${pokemon.owner}`)
        .addField("LEVEL", pokemon.level, true)
        .addField("NATURE", pokemon.nature.name.toUpperCase(), true)
        .addField("TYPES", typeTxt, true)
        .addField("STATS", `${printPokemonsStats(pokemon, msg)}`, true)

        .addField("MOVES", pokemon.avaibleMovesNames().join("\n"), true)
    return embedDatos;
}

module.exports = {
    pokemonEmbed
}