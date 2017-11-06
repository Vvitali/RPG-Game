var playerMadeChoise = 0;

function Warrior(name, attack, cattack) {
    this.isPlayer = 0;
    this.isEnemy = 0;
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

function addToBattlefield(event) {
    $("#characters > #" + event).animate({
            opacity: "hide",
        },
        500, null,
        function() {
            $('#characters>#' + event).detach().prependTo('#battlefield');
            $("#battlefield > #" + event).animate({
                    opacity: "show",
                },
                500, null, null);
        });
}

var Neo = new Warrior("Neo", 100, 80);
var Morpheus = new Warrior("Morpheus", 120, 100);
var Trinity = new Warrior("Trinity", 90, 110);
Neo.attackAction();

//$            .click(function(event) {

$("div.character").click(function(event) {
    console.log("onClick:" + event.currentTarget.id)
    addToBattlefield(event.currentTarget.id);
});
