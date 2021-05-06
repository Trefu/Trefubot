class Pokemon {
    constructor(name, stats, avatar, types) {
        this.name = name;
        //array con objecto: key = nombre de stat, valor = valor de stat
        this.stats = stats;
        this.avatar = avatar;
        this.types = types;

    }
}

module.exports = {
    Pokemon
}