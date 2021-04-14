const loveyou = require("loveyou-api");
const fetch = require("node-fetch")
const Discord = require('discord.js');
const dataT = require("./data.js")
const bot = new Discord.Client();

const {
    prefix,
    token
} = require('./config.json');

let randomPokemonNum = () => Math.floor(Math.random() * 151 + 1)

//user es el objeto del bot
bot.on("ready", () => {
    bot.user.setStatus("dnd")
    console.log(`Bot listo como ${bot.user.tag}`)
})

bot.on("message", msg => {
    //si el mensaje no empieza con el prefix o es un bot se va ignora3 ⛔
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    // argumentos usados para el bot
    const args = msg.content.slice(prefix.length).trim().split(' ');

    // comando que recibe primero
    const command = args.shift().toLowerCase();

    if (command === "") return msg.reply("Y si mandas comandos bodegon de pastas?")
    switch (command) {
        case "pack":

            if (!msg.channel.nsfw) return msg.channel.send("NO TE DESUBIQUES " + dataT.insult.toUpperCase())
            if (args[0] === "help" || !dataT.packCommands.includes(args[0])) return msg.channel.send(`Comandos de pack:\n*` + dataT.packCommands.join("\n*"))
            fetch("https://love-you.xyz/api/v2/" + args[0] || "boobs")
                .then(url => msg.channel.send(new Discord.MessageEmbed().setImage(url)))
                .catch(error => {
                    msg.reply("disculpa capo pero toy medio resfriado y no puedo mandar nada",
                        console.log(error))
                });
            break;

        case "pokemon":
            loveyou.nsfw(args[0] || dataT.getRandomValueFromArr(dataT.packCommands))
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor(data.name.toUpperCase())
                        .setImage(data.sprites.front_default)
                    data.types.forEach(t => exampleEmbed.addField('Tipo', t.type.name, true))
                    msg.channel.send(exampleEmbed)
                })
                .catch(error => console.log(error))
            break;
        default:
            msg.reply("Comando inexistente")
    }
})

bot.login(token)