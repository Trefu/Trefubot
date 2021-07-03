require("dotenv").config();
require("./utils.js");
const fetch = require("node-fetch");
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEM = process.env.TOKEM_DISCORD;
var trainersContainer = [];
var trainerBot;
const {
  pokemonEmbed
} = require("./assets/PokemonMsg");
const {
  Trainer
} = require("./clases/Trainer");
const {
  prefix
} = require("./config.json");
const {
  pack,
  start
} = require("./commands.js");
const {
  pokemons,
  commandsList,
  printList,
  arrRandomValue,
  printPokemonsStats,
  pokemonFormater,
} = require("./utils.js");
const {
  TrainerBot
} = require("./clases/TrainerBot.js");
const {
  natures,
  Pokemon
} = require("./clases/Pokemon");

bot.on("ready", async () => {
  bot.user.setStatus("dnd");
  console.log(`Bot listo como ${bot.user.tag} ✅✅✅❎❎`);
});

bot.on("message", async (msg) => {
  //si el mensaje no empieza con el prefix o es un bot se va ignora3 ⛔
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  //divide cada palabra del msg recibido en un array (ignora el prefix con el slice)
  const args = msg.content.slice(prefix.length).trim().split(" ");

  //quita la primer palabra del array para usarla de comando, el resto queda para usar de opciones/argumentos
  const command = args.shift().toLowerCase();

  if (command === "")
    return msg.reply(
      "No se envio ningun comando (!T help para una lista de comandos)"
    );
  let trainer;
  let findPokemon;
  switch (command) {
    case "add":
      trainer = trainersContainer.find((t) => t.name === msg.author.username);
      findPokemon = args.shift();
      findPokemon = pokemons.find((p) => p.name === findPokemon);
      if (!trainer || !findPokemon) return msg.channel.send("me he pijeao");
      newPokemon = new Pokemon(pokemonFormater(trainer, findPokemon));
      trainer.add(newPokemon);
      break;
    case "help":
      msg.reply(printList(commandsList));
      break;
    case "test":
      trainer = trainersContainer.find((t) => t.name === msg.author.username);
      pokemonFind = args.shift();
      pokemonFind = trainer.pokemons.find((p) => p.name === pokemonFind);

      if (!trainer || !pokemonFind) return msg.channel.send("me he pijeao");

      msg.channel.send(pokemonFind.showMoves());
      break;
    case "pack":
      if (!msg.channel.nsfw) return msg.channel.send("Solo en canales Nsfw");
      let packEndpoint
      const packMethods = [
        "boobs",
        "pussy",
        "ass",
        "missionary",
        "cowgirl",
        "doggystyle",
        "blowjob",
        "cumshots",
        "hentai",
      ];
      if (!args[0]) {
        packEndpoint = arrRandomValue(packMethods)
      } else {
        if (!packMethods.includes(args[0])) {
          return msg.channel.send(`Comandos de pack: \n${packMethods.join("\n")}`)
        }
        packEndpoint = args[0];
      }
      pack(packEndpoint, msg);
      break;

    case "start":
      if (trainersContainer.some((t) => t.name === msg.author.username))
        return msg.reply("Ya tenes entrenador capo");
      start({
        msg: msg,
        container: trainersContainer,
      });
      break;

    case "my":
      var myArg = args[0];
      trainer = trainersContainer.find((t) => t.name === msg.author.username);
      trainerPokemonsNames = trainer.pokemons.map((p) => p.name);

      if (!trainer) return msg.reply("!T start para crear entrenador");

      if (trainerPokemonsNames.includes(myArg)) {
        trainerPokemonToShow = trainer.pokemons.find((p) => p.name === myArg);
        return msg.channel.send(pokemonEmbed(trainerPokemonToShow, msg));
      }

      switch (myArg) {
        case "stats":
          msg.channel.send(trainer.stats(msg));
          break;

        case "pokemons":
          trainer.pokemons.forEach((p) =>
            msg.channel.send(pokemonEmbed(p, msg))
          );
          break;

        default:
          msg.reply(
            "My stats para ver estadisticas propias\nMy (nombre de pokemon en posesion para verlo)\nMy pokemons para ver todos los pokemons en posesion"
          );
          break;
      }

      break;
    case "vs":
      break;
    default:
      msg.reply(
        "Comando inexistente, lista de comandos: \n" + printList(commandsList)
      );
  }
});

bot.login(TOKEM);