const nats = []

class Pokemon {
    constructor(name, stats, avatar, types, owner) {
        this.owner = owner
        this.name = name;
        //array con objecto: key = nombre de stat, valor = valor de stat
        this.stats = stats;
        this.avatar = avatar;
        this.types = types;
        this.moves = [];
    }
}

module.exports = {
    Pokemon
}