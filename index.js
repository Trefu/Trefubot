const rpgDiceRoller = require('rpg-dice-roller');
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
    let args = msg.content.slice(prefix.length).trim().split(' ');

    // comando que recibe primero
    const command = args.shift().toLowerCase();

    if (command === "") return msg.reply("Y si mandas comandos bodegon de pastas?")
    switch (command) {
        case "pack":
            if (!msg.channel.nsfw) return msg.channel.send("Solo en canales Nsfw")
            if (!args[0]) args[0] = dataT.getRandomValueFromArr(dataT.packMethods);
            if (args[0] === "help" || !dataT.packMethods.includes(args[0]))
                return msg.channel.send(`lista de comandos de pack:\n*` + dataT.packMethods.join("\n*"))
            fetch("https://nekobot.xyz/api/image?type=" + args[0])
                .then(res => res.json())
                .then(data => {
                    const EmbedMsg = new Discord.MessageEmbed()
                        .setAuthor(args[0])
                        .setColor(data.color)
                        .setImage(data.message)
                    msg.channel.send(EmbedMsg)
                    return
                })
                .catch(error => console.log(error))
            break;

        case "pokemon":
            fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemonNum())
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data)
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor(data.name.toUpperCase())
                        .setImage(data.sprites.front_default)
                    data.types.forEach(t => exampleEmbed.addField('Tipo', t.type.name, true))
                    msg.channel.send(exampleEmbed)
                })
                .catch(error => console.log(error))
            break;
        case "roll":
            var diceNotation = /^(\d+)?d(\d+)([+-]\d+)?$/;
            if (!args[0].match(diceNotation)) return msg.reply("Error de syntax")
            if (!args[0] || args[0] === "help") {
                return msg.channel.send("!tb roll (Numero de dados + d + Numero de caras del dado) + (posible modificador) \n Ejemplo 1d20+2 = 1 dado de veinte caras mas 2")
            }
            const diceRoll = new rpgDiceRoller.DiceRoll(args[0])
            msg.channel.send(`\`${diceRoll.output}\``).catch((error) => {
                console.log(error)
                msg.channel.send("me pijie xd")
            })
            break;
        default:
            msg.reply("Comando inexistente")
    }
})


bot.login(token)