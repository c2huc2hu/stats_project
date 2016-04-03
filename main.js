var g; 
var outcome1, outcome2; 
var results = {responseTime:0}; 

// always call this 
function initialize()
{
    g = new Game(document.getElementById("gamediv")); 
    outcome1 = new Outcome(g, document.getElementById("bet"), document.getElementById("history1")); 
    outcome2 = new Outcome(g, document.getElementById("betnot"), document.getElementById("history2")); 
    setInterval(update, 10); // ~30 fps
    
    g.setDice(3, 5); 
    outcome1.set(); 
    outcome2.set(); 
}

// The round where the equal probability happens
function initializeEqualProbability()
{
    g.setDice(2, 2); 
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
    if (g.timeStopped != 0)
    {
        results.responseTime = Date.now() - g.timeStopped;
        g.timeStopped = 0; 
    }
}.bind(outcome1); 
document.getElementById('betnot').onclick = function() {
    outcome2.bet += 10; 
    g.addMoney(-10);
    if (g.timeStopped != 0)
    {
        results.responseTime = Date.now() - g.timeStopped;
        g.timeStopped = 0; 
    }
}
document.getElementById('startroll').onclick = g.roll.bind(g); 
