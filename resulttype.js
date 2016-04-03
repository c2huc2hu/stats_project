OUTCOMES = ["\u2264", "\u2265", "="]

var Outcome = function(game, outcomediv) 
{
    this.game = game; 
    this.outcomediv = outcomediv; 
    outcomediv.setAttribute("style", "width:200px; height:200px; border-style:solid; text-align: center; line-height:200px; font-size:50px")
    this.outcomeType = "UNDEFINED"; 
    this.outcome = 0; 
    this.checkedWin = false; // has checked whether the player has won the bet 
    this.bet = 0; 
}

// Call this every tick 
Outcome.prototype.update = function()
{
    var sum = 0; 
    var winning = false; 
    for (var i=0; i<this.game.num; i++)
        if (this.game.type == "die")
            sum += this.game.die[i].value; // taken from gametype.js. yay globals 
        else
            console.log("coins not implemented ")
            //sum += coins[i]
       
    switch(this.outcomeType)
    {
        case "\u2264":
            winning = (sum <= this.outcome); 
            break; 
        case "\u2265":
            winning = (sum >= this.outcome)
            break; 
        case "=":
            winning = (sum == this.outcome)
            break; 
        default:
            winning = true; 
    }
            
    if (winning)
        this.outcomediv.style.background = "#00FF00"; 
    else
        this.outcomediv.style.background = "#FF0000"; 
    
    if (this.game.stopped)
    {
        // check whether player has won 
        if (winning && !this.checkedWin)
        {
            this.checkedWin = true; 
            this.game.addMoney(this.bet * 2); // add bet to the player's money. 
        }
        else if(this.checkedWin)
        {
            this.bet = 0; 
        }
    }
    else
    {
        this.checkedWin = false; // roll has started 
    }

}

// Call this once, the first time the outcome is being generated 
Outcome.prototype.set = function(outcometype, outcome)
{
    /* // Randomly generate outcomes 
    this.outcomeType = OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)]; 
    switch("" + this.game.num + this.game.type)
    {
        case "1die":
            this.outcome = Math.ceil(Math.random() * 6); 
            break; 
        case "2die": // yes, I realize the plural of die is dice. go away and stop reading my source
            this.outcome = Math.ceil(Math.random() * 11 + 1);  // range [2, 12]
            break; 
        case "3die":
            this.outcome = Math.ceil(Math.random() * 15 + 2);  // range [3, 18] 
            break; 
        case "1coin":
            this.outcome = Math.floor(Math.random() * 2); 
            break; 
        case "2coin":
            this.outcome = Math.floor(Math.random() * 3); 
            break; 
        case "3coin":
            this.outcome = Math.floor(Math.random() * 4); 
            break; 
        default:
            this.outcome = "You broke it"; 
    } */ 
    
    this.outcomeType = outcometype; 
    this.outcome = outcome; 
    this.outcomediv.textContent = "" + this.outcomeType + this.outcome; 
}