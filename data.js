const a = "funca"
const listaTrefuNombres = /(?:^|\W)(tre)(?:$|\W)|(?:^|\W)(pelon)(?:$|\W)|(?:^|\W)(chingolense)(?:$|\W)|(?:^|\W)(trefu)(?:$|\W)|(?:^|\W)(lucas)(?:$|\W)|(?:^|\W)(lagoso)(?:$|\W)|(?:^|\W)(lagero)(?:$|\W)|(?:^|\W)(lagoso)(?:$|\W)|(?:^|\W)(chingolero)(?:$|\W)|(?:^|\W)(lucaz)(?:$|\W)|(?:^|\W)(luks)(?:$|\W)|(?:^|\W)(pelado)(?:$|\W)/gi
const msgStart = ["Que te pasa", "Que te pinta", "Que onda", "Que decis"]
const insult = ["Terrorista de pastas", "Bodegon de bischochitos de grasa", "Galaxia de milanesas fritas", "Agujero negro de empanadas", "Cacerola de grasas trans", "Coleccionista de diabetes",
    "Salchichon primavera vencido", "Consumidor compulsivo de salchichas vienissima", "Genocida de ravioles", "TERRORISTA DE SALAME PICANTE", "CERDO TERMOTANQUE DE PIZZAS OCHO QUESOS",
    "ASESINO SERIAL DE GUISOS DE CARNE", "TERROR DE CANELONES A LA BOLOÑESA", "DESTRUCTOR DE POLLOS ASADOS RELLENOS", "EXTINGUIDOR DE MILANESAS DE POLLO",
    "ASESINO SERIAL DE ENCHILADAS TAMAÑO FAMILIAR", "TERMOTANQUE DE BOCATAS DE CALAMARES", "BOLUDO TESTA DE GLANDE, DENME MAYÚSCULAS MÁS GRANDES", "CIÉNAGA REPLETA DE MIL PORONGAS MALOLIENTES",
    "LISIADO ABORTO DE UN MONO CON SÍFILIS, ME ESTÁ DANDO UN INFARTO",
]
const nombres = ["TETAS DE COBAYO", "WASKA DE CURA", "VIOLADOR DE NIÑOS", "ESCUPIDOR DE ANOS", "CHUPA PIJAS", "BOLSA DE GUAMPAS", "FAN DE IRON MAIDEN", "ESTAFADOR DE MERCADOLIBRE", "MENDOCIZO DROGADICTO"]
const packCommands = ["Anal", "4K", "Gonewild", 'Ass', 'Solo', 'Wallpaper', 'Porngif', 'Pussy', "Thigh", "Boobs"]







const getRandomValueFromArr = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}
const getResponse = () => {
    return `${getRandomValueFromArr(msgStart)} ${getRandomValueFromArr(insult).toUpperCase()}`
}
const getName = () => {
    return getRandomValueFromArr(nombres);
}


module.exports.getRandomValueFromArr = getRandomValueFromArr;
module.exports.listaTrefuNombres = listaTrefuNombres;
module.exports.getResponse = getResponse;
module.exports.getName = getName;
module.exports.nombres = nombres
module.exports.insult = getRandomValueFromArr(insult)
module.exports.packCommands = packCommands;
module.exports.getRandomValueFromArr = getRandomValueFromArr;