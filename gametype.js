    // var gamediv = document.getElementById("gamediv"); 

var Game = function(gamediv) 
{
    this.num = 0; 
    this.type = "none"; 
    this.stopped = false; 
    this.die = [null, null, null]; 
    this.timeStarted = Date.now(); 
    this.gamediv = gamediv; 
    this.money = 100; 
    
    for(var i=0; i<3; i++)
    {
        this.die[i] = document.createElement("div"); 
        this.die[i].setAttribute("style", "width:50px; height:50px; border-style:solid; text-align: center; line-height:50px; position: relative; visibility:hidden"); 
        this.die[i].style.left = "" + (i * 60 + 10) + "px"; // so this actually arranges the elements in a diagonal line, not beside each other, but it's a feature, not a bug. 
        this.die[i].style.top = "" + (i * 5 + 10) + "px";
    }
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
        if (Date.now() > this.timeStarted + 500) // run for .5 seconds 
        {
            this.stopped = true; 
        }
    }
}

// initially draws dice
Game.prototype.setDice = function(numDice)
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
}

// initially draws coins
function drawCoins(ctx, numCoins)
{
    
}

Game.prototype.roll = function()
{
    this.stopped = false; 
    this.timeStarted = Date.now(); 
    console.log("rolling", Game.prototype)
}

Game.prototype.addMoney = function(amount)
{
    this.money += amount; 
    document.getElementById("money").textContent = "$" + this.money; 
}