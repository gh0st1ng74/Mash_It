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

function updateScorePerSecond(){
    scrapspersecond = chineseScrap + middleScrap * 5 + bigScrapMachine * 15;
    document.getElementById("scrapspersecond").innerHTML = scrapspersecond;
}

// End Of Buy Button

setInterval(function(){
    scraps = scraps + chineseScrap;
    scraps = scraps + middleScrap * 5; // *5 ca veut dire 5 fois par secondes // Dois etre le meme nombre que celui de la ligne 58
    scraps = scraps + bigScrapMachine * 15; // Dois etre le meme nombre que celui de la ligne 58
    document.getElementById("scraps").innerHTML = scraps;

    document.title = scraps + " Scraps -- Mash It!!"
}, 1000);

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