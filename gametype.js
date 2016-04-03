var Game = function(gamediv) 
{
    this.num = 0; 
    this.type = "none"; 
    this.stopped = false; 
    this.die = [null, null, null]; 
    this.timeStarted = Date.now(); 
    this.gamediv = gamediv; 
    this.money = 100; 
    this.timeStopped = Date.now()
    this.seed = 1; 
    
    for(var i=0; i<3; i++)
    {
        this.die[i] = document.createElement("div"); 
        this.die[i].setAttribute("style", "width:50px; height:50px; border-style:solid; text-align: center; line-height:50px; position: relative; visibility:hidden"); 
        this.die[i].style.left = "" + (i * 60 + 10) + "px"; // so this actually arranges the elements in a diagonal line, not beside each other, but it's a feature, not a bug. 
        this.die[i].style.top = "" + (i * 5 + 10) + "px";
    }
}

Game.prototype.random = function() {
    var x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
}

// called every tick 
Game.prototype.update = function() 
{
    if (!this.stopped)
    {
        for(var i=0; i < 3; i++)
        {
            if (this.die[i])
            {
                this.die[i].value = Math.ceil(Math.random() * 6); 
                this.die[i].textContent = this.die[i].value; 
            }
        }
        if (Date.now() > this.timeStarted + 1000) // run for .5 seconds 
        {
            this.stopped = true; 
            for(var i=0; i<3; i++)
            {
                this.die[i].value = Math.ceil(this.random() * 6); 
                this.die[i].textContent = this.die[i].value; 
            }
            this.timeStopped = Date.now(); 
        }
    }
}

// initially draws dice
Game.prototype.setDice = function(numDice, s)
{
    this.num = numDice; 
    this.type = "die"; 
    
    for(var i=0; i<3; i++)
    {
        this.die[i].style.visibility = "hidden"; 
    }
    
    for (var i=0; i < this.num; i++)
    {
        this.die[i].value = Math.floor(Math.random() * 6 + 1); 
        this.die[i].style.visibility = "visible";
        this.die[i].textContent = this.die[i].value; 
        this.gamediv.appendChild(this.die[i]); 
    }
    this.seed = s
}

// initially draws coins
function drawCoins(ctx, numCoins)
{
    
}

Game.prototype.roll = function()
{
    this.stopped = false; 
    this.timeStarted = Date.now(); 
}

Game.prototype.addMoney = function(amount)
{
    this.money += amount; 
    document.getElementById("money").textContent = "Balance: $" + this.money; 
}