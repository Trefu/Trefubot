const {
    arrRandomValue
} = require("./utils")
const {
    Trainer
} = require("./clases/Trainer")


const fetch = require("node-fetch");
const Discord = require('discord.js');

const packMethods = [
    "boobs",
    "pussy",
    "ass",
    "missionary",
    "cowgirl",
    "doggystyle",
    "blowjob",
    "cumshots",
    "hentai"
];

const pack = function (packEndpoint, msg) {

    const emoj = msg.guild.emojis.cache.find(emoj => emoj.name === "jmf14") || "🔥";
    msg.react(emoj);

    fetch("https://love-you.xyz/api/v2/" + packEndpoint)
        .then(res => res.json())
        .then(data => {
            const EmbedMsg = new Discord.MessageEmbed()
                .setAuthor(`🔥${packEndpoint.toUpperCase()}🔥`)
                .setColor("RED")
                .setImage(`${data.url}`)
            msg.channel.send(EmbedMsg)
            return
        })
        .catch(error => console.log(error));
}


const start = function ({
    msg,
    container,
}) {
    var trainer = new Trainer(msg.author.username, msg.author.displayAvatarURL())
    container.push(trainer)
    trainer.randomPokemons()
    console.log("ENTRENADOR AGREGADO", container)

    return msg.channel.send(trainer.stats())
}
module.exports = {
    pack,
    start
}