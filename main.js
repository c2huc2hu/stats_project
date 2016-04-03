var g; 
var outcome; 

// always call this 
function initialize()
{
    g = new Game(document.getElementById("gamediv")); 
    outcome1 = new Outcome(g, document.getElementById("bet")); 
    outcome2 = new Outcome(g, document.getElementById("betnot")); 
    setInterval(update, 30); // ~30 fps
    
    g.setDice(3); 
    outcome1.set(); 
    outcome2.set(); 
}

// The round where the equal probability happens
function initializeEqualProbability()
{
    g.setDice(2); 
    outcome1.set("\u2264", 7); 
    outcome2.set("\u2265", 7); 
}

function update()
{
    g.update(); 
    outcome1.update(); 
    outcome2.update(); 
}

initialize(); 
initializeEqualProbability(); 

document.getElementById('bet').onclick = function() { 
    outcome1.bet += 10; 
    g.addMoney(-10); 
    console.log("bet on left"); 
}.bind(outcome1); 
document.getElementById('betnot').onclick = function() {
    outcome2.bet += 10; 
    g.addMoney -= 10;
    console.log("bet on right"); 
}
document.getElementById('startroll').onclick = g.roll.bind(g); 
