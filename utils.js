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
    electric: "☀",
    dragon: "🐉"
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
const natures = [];

const arrRandomValue = (arr) => {
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
    var str = [`Level: ${pokemon.level}`];
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

function fetchNatureData(data) {
    let url = data.url
    fetch(url)
        .then(response => response.json())
        .then(natureData => {
            natures.push(natureData)
        })
        .catch(e => console.log(e))
}

function fetchAllNatures() {
    fetch('https://pokeapi.co/api/v2/nature/')
        .then(response => response.json())
        .then(data =>
            data.results.forEach(d =>
                fetchNatureData(d))
        )
        .catch(error => console.log(error))
};

function getFirstGenMoves(pokemon, pokemonLevel) {
    const VALID_VERSIONS_MOVES = ["red-blue", "yellow"];
    var thisPokemonMoves = [];
    const PokemonAllMoves = pokemon.moves.filter(m =>
        m.version_group_details.some(detail => VALID_VERSIONS_MOVES.includes(detail.version_group.name)) &&
        m.version_group_details.some(detail => pokemonLevel >= detail.level_learned_at)
    )
    moveData()

    function moveData() {
        PokemonAllMoves.forEach(m => {
            let url = m.move.url
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    data = formatMoveData(data);
                    thisPokemonMoves.push(data);
                })

                .catch(e => console.log(e))
        })
    }

    function formatMoveData(move) {
        var filtered = {};
        const keys = ["name", "accuracy", "damage_class", "effect_chance", "effect_changes", "effect_entries", "meta", "power", "pp", "target", "type"];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (move.hasOwnProperty(key)) {
                let objData = move[key];
                filtered[key] = objData;
            }
        }
        return filtered
    }
    return thisPokemonMoves;
}



function randomNature() {
    const nat = arrRandomValue(natures)
    var filtered = {};
    const keys = ["name", "decreased_stat", "increased_stat"];
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (nat.hasOwnProperty(key)) {
            let objData = nat[key];
            filtered[key] = objData
        }
    }
    return filtered
}

function statGen(stat, level = 1, nature) {
    let base = stat.base_stat;
    let natureBonus = 1.0;

    if (nature.increased_stat && nature.increased_stat.name === stat.stat.name) natureBonus = 1.2;
    if (nature.decreased_stat && nature.decreased_stat.name === stat.stat.name) natureBonus = 0.8;
    if (stat.stat.name === "hp") return Math.floor(((base * 2 + 100) / 100) * level + 15)
    return Math.floor(((2 * base) * level / 100 + 5) * natureBonus)

    //Math.floor((2 * base) * level / 100 + 10
}
/*toma los datos de la api y se chorea solo lo que necesita antes de instancear la clase, 
retonar un objecto listo para instancear */
function pokemonFormater(trainer, pokemon = arrRandomValue(pokemons)) {

    let newPokemon = pokemon;
    let newPokemonNature = randomNature()
    let newPokemonName = newPokemon.name;
    let newPokemonAvatar = newPokemon.sprites.front_default;
    let newPokemonLevel = 20 //generateRandomNum(50) + 10;
    let newPokemonStats = newPokemon.stats.map(stats => ({
        name: stats.stat.name.replace(/[^a-zA-Z ]/g, ""),
        value: statGen(stats, newPokemonLevel, newPokemonNature)
    }));
    let newPokemonTypes = newPokemon.types.map(t => ({
        name: t.type.name
    }));
    let newPokemonMoves = getFirstGenMoves(newPokemon, newPokemonLevel);
    newPokemonTypes = newPokemonTypes.filter(t => t.name !== "fairy");
    let newPokemonOwner = trainer.name;
    return {
        owner: newPokemonOwner,
        name: newPokemonName,
        stats: newPokemonStats,
        avatar: newPokemonAvatar,
        types: newPokemonTypes,
        level: newPokemonLevel,
        nature: newPokemonNature,
        moves: newPokemonMoves
    }
}

fetchAllPokemons();
fetchAllNatures();

module.exports = {
    arrRandomValue,
    generateRandomNum: generateRandomNum,
    EMOJIS_TYPES,
    pokemons,
    printPokemonsStats,
    printList,
    commandsList,
    generateRandomNum,
    randomNature,
    pokemonFormater

}