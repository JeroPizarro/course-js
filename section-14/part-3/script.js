(function () {
  function Player(name, lvl = 1, points = 0) {
    this.name = name;
    this.lvl = lvl;
    this.points = points;
  }

  Player.prototype.gainXp = function (newPoints) {
    if (newPoints <= 10) {
      this.points += newPoints;
      if (this.points >= 10) {
        this.lvl++;
        this.points -= 10;
      }
    } else {
      alert('Max XP exceeded');
    }
  };
  Player.prototype.describe = function () {
    return `${this.name} is level ${this.lvl} with ${this.points} experience points.`;
  };

  const brad = new Player('Brad', 10);
  const jero = new Player('Jero', 3);

  console.log(brad.describe());

  jero.gainXp(5);
  jero.gainXp(3);
  jero.gainXp(8);
  jero.gainXp(8);
  console.log(jero.describe());
  //jero.gainXp(11);
})();
