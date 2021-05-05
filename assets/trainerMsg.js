const Discord = require('discord.js');
const {
    printPokemonsStats
} = require("../utils")
const trainerEmbed = (trainer) => {
    var embedDatos = new Discord.MessageEmbed()
        .setThumbnail(trainer.avatar)
        .setTitle(`Stats from ${trainer.name}`)
        .setColor(0x00AE86)
        .addField(`RECORD`, `✅ WINS: ${trainer.wins}\n❌ LOSES: ${trainer.loses}`)
        .setTimestamp()

    trainer.pokemons.forEach(p => embedDatos.addField(`${p.name.toUpperCase()}`, printPokemonsStats(p), true))

    return embedDatos
}

module.exports = {
    trainerEmbed
}