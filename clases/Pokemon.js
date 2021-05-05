class Pokemon {
    constructor(name, stats, avatar) {
        this.name = name;
        //array con objecto: key = nombre de stat, valor = valor de stat
        this.stats = stats;
        this.avatar = avatar
    }
}

module.exports = {
    Pokemon
}