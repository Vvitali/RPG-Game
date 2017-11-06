var PlayerSpot = null;
var EnemySpot = null;
var turn = "PlayerSpot";

function Warrior(name, health, attack, cattack) {
    this.isPlayer = 0;
    this.isEnemy = 0;
    this.warriorName = name;
    this.BaseAttackPower = attack;
    this.attackPower = attack;
    this.counterAttackPower = cattack;
    this.healthPoints = health;

    Warrior.prototype.attackAction = function(EnemyChar) {
        console.log(this.warriorName + ": " + arrayOfCharacters[PlayerSpot].healthPoints);
        EnemyChar.counterAttackAction(this);
        EnemyChar.healthPoints -= this.attackPower;
        this.attackPower += this.BaseAttackPower;
        console.log(this.warriorName + ": " + this.attackPower);

    };
    //$("#EnemySpot.character > div > p").html(this.healthPoints);
    Warrior.prototype.counterAttackAction = function(Enemy) {
        Enemy.healthPoints -= this.BaseAttackPower;
    };

    Warrior.prototype.sayYourName = function() {
        console.log(this.warriorName);
    };

    Warrior.prototype.activation = function() {
        var temp = $('<div class="thumbnail character" id="' + this.warriorName + '"><img src = "./assets/img/' + this.warriorName + '.jpg" alt = "' + this.warriorName + ' image" ><div class="caption"><h3>' + this.warriorName + '</h3><p>Health: ' + this.healthPoints + '<br>Attack: ' + this.attackPower + '<br>Counter attack: ' + this.counterAttackPower + '</p></div>')
        $("#characters").append(temp);
    };
}

function addToBattlefield(event) {
    $("#characters > #" + event).animate({
            opacity: "hide",
        },
        500, null,
        function() {
            $('#characters>#' + event).detach().appendTo('#' + turn);
            $("#" + turn + "> #" + event).animate({
                    opacity: "show",
                },
                500, null, null);
            if (turn === "PlayerSpot") {
                turn = "EnemySpot";
                PlayerSpot = event;
            }
            else {
                EnemySpot = event;
                $("div.character").unbind('click');
                $("#btn-attack").click(function() {
                    arrayOfCharacters[PlayerSpot].attackAction(arrayOfCharacters[EnemySpot]);
                    $("#EnemySpot> .character > div > p").html('Health: ' + arrayOfCharacters[EnemySpot].healthPoints + '<br>Attack: ' + arrayOfCharacters[EnemySpot].attackPower + '<br>Counter attack: ' + arrayOfCharacters[EnemySpot].counterAttackPower);
                    $("#PlayerSpot> .character > div > p").html('Health: ' + arrayOfCharacters[PlayerSpot].healthPoints + '<br>Attack: ' + arrayOfCharacters[PlayerSpot].attackPower + '<br>Counter attack: ' + arrayOfCharacters[PlayerSpot].counterAttackPower);

                    if (arrayOfCharacters[EnemySpot].healthPoints <= 0) {
                        $(".panel-body").html(arrayOfCharacters[PlayerSpot].warriorName + " is winner!")
                        $("#PlayerSpot> .character").hide();
                    }
                    if (arrayOfCharacters[PlayerSpot].healthPoints <= 0) {
                        $(".panel-body").html(arrayOfCharacters[EnemySpot].warriorName + " is winner!")
                        $("#EnemySpot> .character").hide();
                    }
                });
                console.log("Attack handler assigned: " + arrayOfCharacters[PlayerSpot].warriorName);
            }
        });

}

var arrayOfCharacters = {

};

arrayOfCharacters.Neo = new Warrior("Neo", 150, 100, 80);
arrayOfCharacters.Neo.activation();
arrayOfCharacters.Morpheus = new Warrior("Morpheus", 250, 120, 100);
arrayOfCharacters.Morpheus.activation();
arrayOfCharacters.Trinity = new Warrior("Trinity", 100, 90, 110);
arrayOfCharacters.Trinity.activation();
arrayOfCharacters.Smith = new Warrior("Smith", 200, 90, 110);
arrayOfCharacters.Smith.activation();

$("div.character").click(function(event) {
    console.log("onClick: " + event.currentTarget.id)
    addToBattlefield(event.currentTarget.id);
});
