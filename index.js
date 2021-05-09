require("dotenv").config();
require("./utils.js");
const fetch = require("node-fetch");
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEM = process.env.TOKEM_DISCORD;
var trainersContainer = [];
var trainerBot;
const {
    pokemonEmbed
} = require("./assets/PokemonMsg")
const {
    Trainer
} = require('./clases/Trainer')
const {
    prefix
} = require('./config.json');
const {
    pack,
    start
} = require("./commands.js");
const {
    pokemons,
    commandsList,
    printList,
    arrRandomValue,
    printPokemonsStats
} = require("./utils.js");
const {
    TrainerBot
} = require("./clases/TrainerBot.js");


bot.on("ready", async () => {
    bot.user.setStatus("dnd");
    console.log(`Bot listo como ${bot.user.tag} ✅✅✅❎❎`);


})

bot.on("message", async msg => {
    //si el mensaje no empieza con el prefix o es un bot se va ignora3 ⛔
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    //divide cada palabra del msg recibido en un array (ignora el prefix con el slice)
    const args = msg.content.slice(prefix.length).trim().split(' ');

    //quita la primer palabra del array para usarla de comando, el resto queda para usar de opciones/argumentos
    const command = args.shift().toLowerCase();

    if (command === "") return msg.reply("No se envio ningun comando (!T help para una lista de comandos)");

    switch (command) {

        case "help":
            msg.reply(printList(commandsList));
            break;

        case "e":

            const emojiList = msg.guild.emojis.cache.map(e => e);
            console.log(emojiList)
            msg.channel.send(emojiList);
            break;

        case "pack":

            var packEndpoint = args[0];
            if (!msg.channel.nsfw) return msg.channel.send("Solo en canales Nsfw");
            if (!packEndpoint) packEndpoint = arrRandomValue(packMethods);

            pack(packEndpoint, msg);
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

        case "start":

            if (trainersContainer.some(t => t.name === msg.author.name)) return msg.reply("Ya tenes entrenador capo")
            start({
                msg: msg,
                container: trainersContainer
            })
            break;

        case "my":
            var myArg = args[0];
            var trainer = trainersContainer.find(t => t.name === msg.author.username);

            if (!trainer) return msg.reply("!T start para crear entrenador");

            switch (myArg) {
                case "stats":
                    msg.channel.send(trainer.stats(msg))
                    break;

                case "pokemons":
                    trainer.pokemons.forEach(p => msg.channel.send(pokemonEmbed(p, msg)));
                    break;

                default:
                    msg.reply("ni idea que pusiste pelotudo")
                    break;
            }

            break;
        default:
            msg.reply("Comando inexistente, lista de comandos: \n" + printList(commandsList));
    }
})


bot.login(TOKEM)