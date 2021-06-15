const { arrRandomValue } = require("../utils");
const { fetchMoves } = require("../utils");
class Pokemon {
  constructor({ name, stats, avatar, types, owner, level, nature, moves }) {
    this.owner = owner;
    this.name = name;
    this.level = level || 1;
    //array con objecto: key = nombre de stat, valor = valor de stat
    this.stats = stats;
    this.avatar = avatar;
    this.types = types;
    this.moves = moves;
    this.combatMoves = [];
    this.exp = 0;
    this.nature = nature;
    this.movesAvaible = [];
  }
  showMoves() {
    const test = [];
    while (test.length < 3) {
      test.push(arrRandomValue(this.moves));
    }
    const txt = test.map(
      (m) => `${m.name.toUpperCase()}: ${m.effect_entries[0].short_effect}`
    );
    console.log(txt);
    return txt.join("\n");
  }
  avaibleMovesNames() {
    const movesName = [];
    while (movesName.length < 4) {
      let name = this.moves.find((m) => !movesName.includes(m.name));
      if (!name) break;
      movesName.push(name.name);
    }
    console.log(movesName);
    return movesName;
  }
  getActualMoves() {}
  /*    initRandom() {
           this.nature = randomNature();

       } */
}

module.exports = {
  Pokemon,
};
