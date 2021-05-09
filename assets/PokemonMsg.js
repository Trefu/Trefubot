const Discord = require('discord.js');
const {
    EMOJIS_TYPES
} = require("../utils")
const {
    printPokemonsStats
} = require("../utils")

const pokemonEmbed = (pokemon, msg) => {

    var embedDatos = new Discord.MessageEmbed()
        .setThumbnail(pokemon.avatar)
        .setTitle(`Stats from ${pokemon.name.toUpperCase()} owned by ${pokemon.owner}`)
        .setColor(0x00AE86)
        .addField("STATS\n", printPokemonsStats(pokemon, msg));
    pokemon.types.forEach(t => embedDatos.addField("Type", `${t.name.toUpperCase()} ${EMOJIS_TYPES[t.name]}`))

    //trainer.pokemons.forEach(p => embedDatos.addField(`${p.name.toUpperCase()}`, printPokemonsStats(p), true))
    return embedDatos
}

module.exports = {
    pokemonEmbed
}