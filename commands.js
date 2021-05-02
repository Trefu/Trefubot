const {
    arrRandomValue,
    packMethods
} = require("./utils");
const fetch = require("node-fetch");
const Discord = require('discord.js');

const pack = function (args, msg) {
    const emoj = msg.guild.emojis.cache.find(emoj => emoj.name === "jmf14") || "🔥";
    msg.react(emoj);

    var packEndpoint = args[0];
    //si no se da un argumento para el pedido, se obtiene uno aleatorio
    if (!args[0]) packEndpoint = arrRandomValue(packMethods);

    if (!packMethods.includes(packEndpoint))
        return msg.channel.send(`lista de comandos de pack:\n*` + packMethods.join("\n*"));

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

module.exports = {
    pack
}