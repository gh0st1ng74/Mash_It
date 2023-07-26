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

var building = {
    name: ["ChineseMachine", "MiddleMachine", "BigMachine"], // Le nom de toute tes machines
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
        document.title = game.scraps + " Scraps -- Mash It";
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

window.onload = function(){
    display.updateScraps();
    display.updateShop();
}
