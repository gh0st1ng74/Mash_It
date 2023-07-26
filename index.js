// Variables
var scraps = 0;
var chineseScrapCost = 15;
var middleScrapCost = 100;
var bigScrapMachineCost = 250;
var chineseScrap = 0;
var middleScrap = 0;
var bigScrapMachine = 0;

var clickingPower = 1;
const switchThemeBtn = document.querySelector('.changetheme')
let toggleTheme = 0;

// Buy Buttons
function addSracps(amount){
    scraps = scraps + amount;
    document.getElementById("scraps").innerHTML = scraps;
}

function buyChineseMachine(){
    if (scraps >= chineseScrapCost) {
        scraps = scraps - chineseScrapCost;
        chineseScrap = chineseScrap + 1;
        chineseScrapCost = Math.round(chineseScrapCost * 1.15);

        document.getElementById("scraps").innerHTML = scraps;
        document.getElementById("chineseCrusherCost").innerHTML = chineseScrapCost;
        document.getElementById("chineseCrusher").innerHTML = chineseScrap;
        updateScorePerSecond();
    }
}

function buyMiddleMachine(){
    if (scraps >= middleScrapCost) {
        scraps = scraps - middleScrapCost;
        middleScrap = middleScrap + 1;
        middleScrapCost = Math.round(middleScrapCost * 1.20);

        document.getElementById("scraps").innerHTML = scraps;
        document.getElementById("middleScrapCost").innerHTML = middleScrapCost;
        document.getElementById("middleCrusher").innerHTML = middleScrap;
        updateScorePerSecond();
    }
}

function buyBigMachine(){
    if (scraps >= bigScrapMachineCost) {
        scraps = scraps - bigScrapMachineCost;
        bigScrapMachine = bigScrapMachine + 1;
        bigScrapMachineCost = Math.round(bigScrapMachineCost * 1.30);

        document.getElementById("scraps").innerHTML = scraps;
        document.getElementById("BigMachineCost").innerHTML = bigScrapMachineCost;
        document.getElementById("BigCrusher").innerHTML = bigScrapMachine;
        updateScorePerSecond();
    }
}
// End Of Buy Button

function updateScorePerSecond(){
    scrapspersecond = chineseScrap + middleScrap * 5 + bigScrapMachine * 15;
    document.getElementById("scrapspersecond").innerHTML = scrapspersecond;
}

function loadGame(){// mettre chaque objet ou amélioration que l'on souhaite charger
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.scraps !== "undefined") scraps = savedGame.scraps;
    if (typeof savedGame.clickingPower !== "undefined") clickingPower = savedGame.clickingPower;
    if (typeof savedGame.chineseScrapCost !== "undefined") chineseScrapCost = savedGame.chineseScrapCost;
    if (typeof savedGame.middleScrapCost !== "undefined") middleScrapCost = savedGame.middleScrapCost;
    if (typeof savedGame.bigScrapMachineCost !== "undefined") bigScrapMachineCost = savedGame.bigScrapMachineCost;
    if (typeof savedGame.chineseScrap !== "undefined") chineseScrap = savedGame.chineseScrap;
    if (typeof savedGame.middleScrap !== "undefined") middleScrap = savedGame.middleScrap;
    if (typeof savedGame.bigScrapMachine !== "undefined") bigScrapMachine = savedGame.bigScrapMachine;
}
       
function saveGame(){  // mettre chaque objet ou amélioration que l'on souhaite sauvegarder
    var gameSave = {
        scraps: scraps,
        clickingPower: clickingPower,
        chineseScrapCost: chineseScrapCost,
        middleScrapCost: middleScrapCost,
        bigScrapMachineCost: bigScrapMachineCost,
        chineseScrap: chineseScrap,
        middleScrap: middleScrap,
        bigScrapMachine: bigScrapMachine
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function resetGame(){
    if (confirm("Are you sure you want to reset your game ?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

window.onload = function(){
    loadGame();
    updateScorePerSecond();
    document.getElementById("scraps").innerHTML = scraps;
    document.getElementById("chineseCrusherCost").innerHTML = chineseScrapCost;
    document.getElementById("chineseCrusher").innerHTML = chineseScrap;
    document.getElementById("middleScrapCost").innerHTML = middleScrapCost;
    document.getElementById("middleCrusher").innerHTML = middleScrap;
    document.getElementById("BigMachineCost").innerHTML = bigScrapMachineCost;
    document.getElementById("BigCrusher").innerHTML = bigScrapMachine;
};

setInterval(function(){
    scraps = scraps + chineseScrap;
    scraps = scraps + middleScrap * 5; // *5 ca veut dire 5 fois par secondes // Dois etre le meme nombre que celui de la ligne 58
    scraps = scraps + bigScrapMachine * 15; // Dois etre le meme nombre que celui de la ligne 58
    document.getElementById("scraps").innerHTML = scraps;

    document.title = scraps + " Scraps -- Mash It!!"
}, 1000);

setInterval(function(){
    saveGame();
}, 30000);

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { // CTRL + S
        event.preventDefault();
        saveGame();
    }
}, false);

// Dark-Mode theme
switchThemeBtn.addEventListener('click', () => {
    if (toggleTheme === 0) {
        document.documentElement.style.setProperty('--ecriture', '#f1f1f1');
        document.documentElement.style.setProperty('--background', '#262626');
        toggleTheme ++;
    }
    else{
        document.documentElement.style.setProperty('--ecriture', '#262626');
        document.documentElement.style.setProperty('--background', '#ffffff');
        toggleTheme--;
    }
})
