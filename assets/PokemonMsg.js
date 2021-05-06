const Discord = require('discord.js');
const {
    EMOJIS_TYPES
} = require("../utils")
const {
    printPokemonsStats
} = require("../utils")

const pokemonEmbed = (pokemon) => {
    var embedDatos = new Discord.MessageEmbed()
        .setThumbnail(pokemon.avatar)
        .setTitle(`Stats from ${pokemon.name.toUpperCase()}`)
        .setColor(0x00AE86)
        .addField("STATS\n", printPokemonsStats(pokemon));
    pokemon.types.forEach(t => embedDatos.addField("Type", `${t.name.toUpperCase()} ${EMOJIS_TYPES[t.name]}`))

    //trainer.pokemons.forEach(p => embedDatos.addField(`${p.name.toUpperCase()}`, printPokemonsStats(p), true))
    return embedDatos
}

module.exports = {
    pokemonEmbed
}