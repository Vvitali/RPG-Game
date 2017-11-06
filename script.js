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
    rounds++;
    Warrior.prototype.attackAction = function(EnemyChar) {
        EnemyChar.counterAttackAction(this);
        EnemyChar.healthPoints -= this.attackPower;
        this.attackPower += this.BaseAttackPower;
        console.log(this.warriorName + " health: " + arrayOfCharacters[PlayerSpot].healthPoints);
        console.log(this.warriorName + " attackPower: " + this.attackPower);
        console.log(EnemyChar.warriorName + " health2:" + EnemyChar.healthPoints);
        console.log("------------");
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
                    //console.log(arrayOfCharacters[PlayerSpot].warriorName + arrayOfCharacters[PlayerSpot].healthPoints);
                    $("#EnemySpot> .character > div > p").html('Health: ' + arrayOfCharacters[EnemySpot].healthPoints + '<br>Attack: ' + arrayOfCharacters[EnemySpot].attackPower + '<br>Counter attack: ' + arrayOfCharacters[EnemySpot].counterAttackPower);
                    $("#PlayerSpot> .character > div > p").html('Health: ' + arrayOfCharacters[PlayerSpot].healthPoints + '<br>Attack: ' + arrayOfCharacters[PlayerSpot].attackPower + '<br>Counter attack: ' + arrayOfCharacters[PlayerSpot].counterAttackPower);

                    if (arrayOfCharacters[EnemySpot].healthPoints <= 0) {
                        $(".panel-body").html(arrayOfCharacters[PlayerSpot].warriorName + " is winner!")
                        //$("#EnemySpot> .character").hide();
                        $("#EnemySpot> .character").detach();
                        $("#btn-attack").unbind('click');
                        EnemySpot = null;
                        console.log(rounds)

                        if (rounds > 0) {
                            charactersClickHandlerActivate();
                            rounds--;
                        }
                        else {
                            alert("You are winner!")
                            $("#q, #w").show();
                        }
                    }
                    if (arrayOfCharacters[PlayerSpot].healthPoints <= 0) {
                        $(".panel-body").html(arrayOfCharacters[EnemySpot].warriorName + " is winner!")
                        $("#PlayerSpot> .character").detach();
                        alert("Game over")
                    }
                });
                console.log("Attack handler assigned: " + arrayOfCharacters[PlayerSpot].warriorName);
            }
        });
}

var arrayOfCharacters = {};
var rounds = -2;
arrayOfCharacters.Neo = new Warrior("Neo", 750, 20, 20);
arrayOfCharacters.Neo.activation();
arrayOfCharacters.Morpheus = new Warrior("Morpheus", 750, 30, 30);
arrayOfCharacters.Morpheus.activation();
arrayOfCharacters.Trinity = new Warrior("Trinity", 750, 20, 25);
arrayOfCharacters.Trinity.activation();
arrayOfCharacters.Smith = new Warrior("Smith", 800, 35, 35);
arrayOfCharacters.Smith.activation();
$("#q, #w").hide();

function charactersClickHandlerActivate() {
    $("div.character").click(function(event) {
        console.log("onClick: " + event.currentTarget.id)
        addToBattlefield(event.currentTarget.id);
    });
}
charactersClickHandlerActivate();
