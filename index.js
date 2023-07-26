// Dark mode
const switchThemeButton = document.querySelector('.changeTheme')
let toggleTheme = 0;

switchThemeButton.addEventListener('click', () => {
    if (toggleTheme === 0) {
        document.documentElement.style.setProperty('--ecriture', '#262626')
        document.documentElement.style.setProperty('--background', '#ffffff')
        document.documentElement.style.setProperty('--backgroundFonce', '#f2f2f2')
        toggleTheme ++;
    }
    else{
        document.documentElement.style.setProperty('--ecriture', '#ffffff')
        document.documentElement.style.setProperty('--background', '#262626')
        document.documentElement.style.setProperty('--backgroundFonce', '#212121')
        toggleTheme --;
    }
});

var game = {
    scraps: 0,
    totalScraps: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.001,

    addToScraps: function(amount)
    {
        this.scraps += amount;
        this.totalScraps += amount;
        display.updateScraps();
    },

    getSrapsPerSecond: function(){
        var scrapsPerSecond = 0;
        for(i = 0; i < building.name.length; i++){
            scrapsPerSecond += building.income[i] * building.count[i];
        }
        return scrapsPerSecond;
    }
};


// Ajout des différents batiments
var building = {
    name: ["Chinese Machine", "Middle Machine", "Big Machine"], // Le nom de toute tes machines
    image: ["ChineseCrusher.png", "Crusher.png", "BigCrusher.png"], // Leur image
    count: [0, 0, 0],
    income: [1, 5, 20], // Combien elle font gagner en une seconde
    cost: [30, 150, 300], // Leur prix

    purchase: function(index){
        if(game.scraps >= this.cost[index]){
            game.scraps -= this.cost[index];
            this.count[index] ++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateScraps();
            display.updateShop();
        }
    }
};

var display = {
    updateScraps: function(){
        document.getElementById("scraps").innerHTML = game.scraps;
        document.getElementById("scrapspersecond").innerHTML = game.getSrapsPerSecond();
        document.title = game.scraps + " Scraps -- Mash It !!";
    },

    updateShop: function(){
        document.getElementById("shopContainer").innerHTML = "";
        for(i = 0; i < building.name.length; i++){
            document.getElementById("shopContainer").innerHTML += '<table class="shopbtn unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="Images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> Scraps</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>'
        }
    }
};

function saveGame(){
    var gameSave = {
        scraps: game.scraps,
        totalScraps: game.totalScraps,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.scraps !== "undefined") game.scraps = savedGame.scraps;
        if (typeof savedGame.totalScraps !== "undefined") game.totalScraps = savedGame.totalScraps;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.buildingCount !== "undefined"){
            for(i = 0; i < savedGame.buildingCount.length; i++){
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined"){
            for(i = 0; i < savedGame.buildingCost.length; i++){
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined"){
            for(i = 0; i < savedGame.buildingIncome.length; i++){
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
    }
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
    display.updateScraps();
    display.updateShop();
}

setInterval(function() {
    game.scraps += game.getSrapsPerSecond();
    game.totalScraps += game.getSrapsPerSecond();
    display.updateScraps();
}, 1000)

setInterval(function(){
    saveGame();
}, 30000);

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { // CTRL + S
        event.preventDefault();
        saveGame();
    }
}, false);
