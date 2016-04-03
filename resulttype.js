OUTCOMES = ["\u2264", "\u2265", "="]

var Outcome = function(game, outcomediv, historydiv) 
{
    this.game = game; 
    this.outcomediv = outcomediv; 
    outcomediv.setAttribute("style", "width:200px; height:200px; border-style:solid; text-align: center; line-height:50px; font-size:40px; white-space:pre-wrap")
    this.outcomeType = "UNDEFINED"; 
    this.outcome = 0; 
    this.checkedWin = false; // has checked whether the player has won the bet 
    this.bet = 0; 
    this.streak = 0; 
    this.history = ["", "", "", "", "", "", "", ""]; 
    this.historydiv = historydiv;
}

// Call this every tick 
Outcome.prototype.update = function()
{
    var sum = 0; 
    var winning = false; 
    for (var i=0; i<this.game.num; i++)
    {
        if (this.game.type == "die")
            sum += this.game.die[i].value; // taken from gametype.js. yay globals 
        else
            console.log("coins not implemented ")
            //sum += coins[i]
    }
       
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
            break; 
    }
            
    if (winning)
    {
        this.outcomediv.style.background = "#00FF00"; 
    }
    else
    {
        this.outcomediv.style.background = "#FF0000"; 
    }
    
    if (this.game.stopped)
    {
        // check whether player has won 
        if (!this.checkedWin)
        {
            if (winning)
            {
                this.game.addMoney(this.bet * 2); // add bet to the player's money. 
                this.streak += 1; 
                this.history = ["Won; " + sum + " " + this.outcomeType + this.outcome + "\n"].concat(this.history.slice(0, -1)); 
            }
            else
            {
                this.streak = 0; 
                this.history = ["Lost; " + sum + " " + this.outcomeType + this.outcome + "\n"].concat(this.history.slice(0, -1));
            }
            this.bet = 0; 
            this.checkedWin = true; 
        }
        
        this.historydiv.textContent = "Streak: " + this.streak + "\n\n" + this.history.join(""); 
    }
    else
    {
        this.checkedWin = false; // roll has started 
    }
    
    this.outcomediv.textContent = "Sum " + this.outcomeType + " " + this.outcome + "\n" + "Bet: " + this.bet; 
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