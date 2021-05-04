const Discord = require('discord.js');

const trainerEmbed = (trainer) => {
    const embedDatos = new Discord.MessageEmbed()
        .setAuthor(trainer.name, trainer.avatar)
        .setThumbnail(trainer.avatar)
        .setTitle(`Stats from ${trainer.name}`)
        .setColor(0x00AE86)
        .addField(`WINS: ${trainer.wins}\nLOSES: ${trainer.loses}`)
        .addField("Charmander", "stats", false)
        .addField("Charmander", "stats", false)
        .addField("Charmander", "stats", false)
        .setTimestamp()
    /*
            .setImage(msg.author.displayAvatarURL())
            .
            
            .setURL("https://github.com/CraterMaik")
            .addField("Este es un título de campo", "Este es un valor de campo puede contener 1024 caracteres.")
            .addField("Campo en línea", "Debajo del campo en línea", true)
            .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true); */

    /*  trainer.pokemons.forEach(pok => {
         embedDatos.addField(`${pok.name}`, pok.avatar)
     }); */
    return embedDatos
}

module.exports = {
    trainerEmbed
}