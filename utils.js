const fetch = require("node-fetch");

const commandsList = ["Prefix: !T", "start: crea un entrenador y obtiene tres pokemons aleatorios", "my stats: muestra las estadisticas del entrenador que envia el comando", "my pokemons: muestra los pokemons que el traine actual posee junto sus estadisticas"]

const EMOJIS_TYPES = {
    normal: "😒",
    fire: "🔥",
    water: "💧",
    grass: "☘",
    ice: "❄",
    fighting: "🥊",
    poison: "🧿",
    ground: "🌄",
    bug: "🐛",
    dark: "🌑",
    flying: "🦅",
    ghost: "👻",
    psychic: "🔮",
    steel: "⚙",
    rock: "🗻",
    electric: "☀"
}

const statsNames = {
    "hp": "",
    "attack": "",
    "defense": "",
    "special-attack": "",
    "special-defense": "",
    "speed": ""
}

var pokemons = [];

const getRandomValueFromArr = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}
const generateRandomNum = (num) => Math.floor(Math.random() * num + 1)

//utiliza el parametro URL para obtener todas las estadisticas e info de un pokemon
function fetchPokemonData(pokemon) {
    let url = pokemon.url
    fetch(url)
        .then(response => response.json())
        //objecto con data pokemon
        .then(pokemonData => {
            pokemons.push(pokemonData)
        })
        .catch(e => console.log(e))
}

//Obtiene un json con los primeros 151 pokemons(este contiene su nombre y una URL con sus datos y estadisticas.)
function fetchAllPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(allpokemons =>
            allpokemons.results.forEach(pokemon =>
                fetchPokemonData(pokemon))
        )
        .catch(error => console.log(error))
};

function printPokemonsStats(pokemon, msg) {

    var str = [];
    const auxEmojis = ["❤", "⚔", "🛡", "🌀", "🎆", "👟"];

    pokemon.stats.forEach((s, i) => {
        const statEmoji = msg.guild.emojis.cache.find(emoj => emoj.name === s.name) || auxEmojis[i];
        str.push(`\n${statEmoji}: ${s.value}`)
    })

    return str.join(" ")
}

function printList(list) {
    return list.join("\n");
}
fetchAllPokemons();

module.exports = {
    arrRandomValue: getRandomValueFromArr,
    generateRandomNum: generateRandomNum,
    EMOJIS_TYPES,
    pokemons,
    printPokemonsStats,
    printList,
    commandsList
}