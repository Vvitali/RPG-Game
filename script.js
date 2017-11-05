function Warrior(name, attack, cattack) {

    this.warriorName = name;
    this.attackPower = attack;
    this.counterAttack = cattack;
    Warrior.prototype.couterAttackPower = 0;
    Warrior.prototype.healthPoints = 0;

    Warrior.prototype.attackAction = function() {
        this.attackPower += this.attackPower;
    };

    Warrior.prototype.counterAttackAction = function() {

    };

    Warrior.prototype.sayYourName = function() {
        console.log(this.warriorName);
    }


}


var Neo = new Warrior("Neo", 100, 80);
var Morpheus = new Warrior("Morpheus", 120, 100);
var Trinity = new Warrior("Trinity", 90, 110);

console.log("Neo " + Neo.warriorName + Neo.attackPower + Neo.counterAttack);
Neo.attackAction();
console.log("Neo: " + Neo.attackPower);
