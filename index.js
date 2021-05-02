require("dotenv").config();
require("./utils.js");
const fetch = require("node-fetch");
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEM = process.env.TOKEM_DISCORD;

const {
    prefix
} = require('./config.json');
const {
    pack
} = require("./commands.js");
const {
    pokemons,
    fetchAllPokemons
} = require("./utils.js");


bot.on("ready", async () => {
    bot.user.setStatus("dnd");
    console.log(`Bot listo como ${bot.user.tag} ✅✅✅❎❎`);
})

bot.on("message", msg => {
    //si el mensaje no empieza con el prefix o es un bot se va ignora3 ⛔
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    //divide cada palabra del msg recibido en un array (ignora el prefix con el slice)
    const args = msg.content.slice(prefix.length).trim().split(' ');

    //quita la primer palabra del array para usarla de comando, el resto queda para usar de opciones/argumentos
    const command = args.shift().toLowerCase();

    if (command === "") return msg.reply("No se envio ningun comando");

    switch (command) {
        case "test":
            let name = args[0];
            let pokemonEncontrado = pokemons.find(obj => obj.name = name);
            if (!pokemonEncontrado) return msg.reply("no lo encontra pá, mil disculpas, soy un bot de mierda");
            let stats = pokemonEncontrado.stats.map(s => {
                //retornar objecto con nombrey  stat
            })
            console.log(stats)

            //let a = pokemons.find(p => p.name === "mew")

            break;
        case "pack":
            if (!msg.channel.nsfw) return msg.channel.send("Solo en canales Nsfw");
            pack(args, msg);
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
        default:
            msg.reply("Comando inexistente")
    }
})


bot.login(TOKEM)