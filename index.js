<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mash It !!</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="changeTheme unselectable"><span class="changeTheme">Dark</span></div>

    
    <button id="afficherMenu">Afficher le menu</button>


    <div class="sectionLeft">
        <div id="menu" style="display: none;">
            <button class="menu-button">1</button>
            <button class="menu-button">Option 2</button>
            <button class="menu-button">Option 3</button>
        </div>
        
        <div class="scrapscontainer unselectable">
            <span id="scrapsPerSecond">0</span> Scraps Per Second<br>
            <span id="scraps">0</span> Scrap(s)<br>
        </div>
        <br>
            
        <div class="clickercontainer unselectable">
            <img id="clicker" src="Images/Décharge.png" width="" height="180">
        </div>   
    </div>

    <div class="sectionRight">
        <div id="upgradeContainer"></div>
        <div id="shopContainer"></div>
    </div>

    <div class="sectionFooter">
        <button onclick="resetGame()">Reset Game</button>
        <h3>Mash It!! by Gh0st1ng</h3>
        <h4>Save With CTRL + S</h4>
    </div>
</body>
<script src="index.js"></script>
</html>
