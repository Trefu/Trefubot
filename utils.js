const fetch = require("node-fetch");
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
const EmojisType = {
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
    rock: "🗻"
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
    fetch('https://pokeapi.co/api/v2/pokemon?limit=22')
        .then(response => response.json())
        .then(allpokemons =>
            allpokemons.results.forEach(pokemon =>
                fetchPokemonData(pokemon))
        )
        .catch(error => console.log(error))
};

fetchAllPokemons();

module.exports = {
    arrRandomValue: getRandomValueFromArr,
    packMethods: packMethods,
    generateRandomNum: generateRandomNum,
    EmojisType,
    fetchAllPokemons,
    pokemons

}