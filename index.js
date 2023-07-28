// Dark mode
const switchThemeButton = document.querySelector('.changeTheme');
let toggleTheme = 1;

switchThemeButton.addEventListener('click', () => {
    if (toggleTheme === 0) {
        document.documentElement.style.setProperty('--ecriture', '#262626');
        document.documentElement.style.setProperty('--background', '#ffffff');
        document.documentElement.style.setProperty('--backgroundFonce', '#f2f2f2');
        toggleTheme++;
    } else {
        document.documentElement.style.setProperty('--ecriture', '#ffffff');
        document.documentElement.style.setProperty('--background', '#262626');
        document.documentElement.style.setProperty('--backgroundFonce', '#212121');
        toggleTheme--;
    }
});

var game = {
    scraps: 0,
    totalScraps: 0,
    totalClicks: 0,
    clickValue: 1,
    version: "v0.0.1",

    addToScraps: function(amount){
        this.scraps += amount
        this.totalScraps += amount
        display.updateScraps();
        display.updateShop();
    },

    getScrapsPerSecond: function(){
        var scrapsPerSecond = 0;
        for (i = 0; i < building.name.length; i++){
            scrapsPerSecond += building.income[i] * building.count[i];
        }
        return scrapsPerSecond;
    }
};

var building = {
    name: ["Chinese Machine", "Middle Machine", "Big Machine"], // Le nom de toute tes machines
    image: ["ChineseCrusher.png", "Crusher.png", "BigCrusher.png"], // Leur image
    count: [0, 0, 0],
    income: [1, 5, 20], // Combien elle font gagner en une seconde
    cost: [30, 150, 300], // Leur prix

    purchase: function (index) {
        if (game.scraps >= this.cost[index]) {
            game.scraps -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.07);
            display.updateScraps();
            display.updateUpgrades();
            display.updateShop();
        }
    }
};

var upgrade = {
    name: ["Good Chinese", "High Quality Machine", "Rocky Mouse", "Hell Mouse"],
    description: ["The Chinese Machine work X2", "All Your Middle Machine Work X2.5", "The mouse work x4", "The mouse work x10"],
    image: ["Employe.png", "Crusher.png", "Mouse.png", "HellMouse.png"],
    type: ["building", "building", "click", "click"],
    cost: [150, 1000, 200, 550],
    buildingIndex: [0, 1, -1, -1],
    requirement: [1, 10, 100, 600],
    bonus: [2, 2.5, 4, 10],
    purchased: [false, false, false, false],

    purchase: function(index) {
        if (!this.purchased[index] && game.scraps >= this.cost[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.scraps -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScraps();
            }else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
                game.scraps -= this.cost[index];
                game.clickValue *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScraps();
            }
        }
    }
}

var display = {
    updateScraps: function(){
        document.getElementById("scraps").innerHTML = game.scraps;
        document.getElementById("scrapsPerSecond").innerHTML = game.getScrapsPerSecond();
        document.title = game.scraps + " Scraps -- Mash It !!";
    },

    updateShop: function () {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopbtn unselectable" onclick="building.purchase(' + i + ')"><tr><td id="image"><img src="Images/' + building.image[i] + '"></td><td id="nameAndCost"><p>' + building.name[i] + '</p><p><span>' + building.cost[i] + '</span> Scraps</p></td><td id="amount"><span>' + building.count[i] + '</span></td></tr></table>'
        }
    },

    updateUpgrades: function() {
        document.getElementById("upgradeContainer").innerHTML = "";
        for(i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="Images/' + upgrade.image[i] + '" title="' + upgrade.name[i] + ' &#10; ' + upgrade.description[i] + ' &#10; (' + upgrade.cost[i] + ' Scraps)" onclick="upgrade.purchase(' + i + ')">';
                }else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="Images/' + upgrade.image[i] + '" title="' + upgrade.name[i] + ' &#10; ' + upgrade.description[i] + ' &#10; (' + upgrade.cost[i] + ' Scraps)" onclick="upgrade.purchase(' + i + ')">';
                }
            }
        }
    }
};


function saveGame() {
    var gameSave = {
        scraps: game.scraps,
        totalScraps: game.totalScraps,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased,
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.scraps !== "undefined") game.scraps = savedGame.scraps;
        if (typeof savedGame.totalScraps !== "undefined") game.totalScraps = savedGame.totalScraps;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for(i = 0; i < savedGame.upgradePurchased.length; i++){
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }
    }
}

document.getElementById("clicker").addEventListener("click", function() {
    game.totalClicks++;
    game.addToScraps(game.clickValue);
}, false);

function resetGame() {
    if (confirm("Are you sure you want to reset your game ?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
};

window.onload = function () {
    loadGame();
    display.updateScraps();
    display.updateUpgrades();
    display.updateShop();
};

setInterval(function(){
    game.scraps += game.getScrapsPerSecond();
    game.totalScraps += game.getScrapsPerSecond();
    display.updateScraps();
}, 1000);

setInterval(function() {
    display.updateScraps();
    display.updateUpgrades();
}, 3000);

setInterval(function () {
    saveGame();
}, 15000);

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.which == 83) { // CTRL + S
        event.preventDefault();
        saveGame();
    }
}, false);

function openMenu() {
    const menuBackground = document.getElementById('menuBackground');
    menuBackground.style.display = 'block';
  }
  
  function closeMenu() {
    const menuBackground = document.getElementById('menuBackground');
    menuBackground.style.display = 'none';
  }
  
  function resetGame() {
    // Votre fonction resetGame() existante si nécessaire
  }
