var g; 
var outcome1, outcome2; 
var sessionID = Date.now(); 
var results = {sessionID:sessionID, responseTime:0, bet:0, amount:0}; 


// always call this 
function initialize()
{
    g = new Game(document.getElementById("gamediv")); 
    outcome1 = new Outcome(g, document.getElementById("bet"), document.getElementById("history1"), document.getElementById("streak1")); 
    outcome2 = new Outcome(g, document.getElementById("betnot"), document.getElementById("history2"), document.getElementById("streak2")); 
    setInterval(update, 10); 
    
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
    if (outcome1.bet > outcome2.bet)
    {
        results.bet = 1; 
        results.amount = outcome1.bet; 
    }
    g.addMoney(-10); 
    if (g.timeStopped != 0)
    {
        results.responseTime = Date.now() - g.timeStopped;
        g.timeStopped = 0; 
    }
}.bind(outcome1); 
document.getElementById('betnot').onclick = function() {
    outcome2.bet += 10; 
    if (outcome1.bet < outcome2.bet)
    {
        results.bet = 2; 
        results.amount = outcome2.bet; 
    }
    g.addMoney(-10);
    if (g.timeStopped != 0)
    {
        results.responseTime = Date.now() - g.timeStopped;
        g.timeStopped = 0; 
    }
}

$('#startroll').click(function() {
  console.log("Submitted. Just ignore the error messages.");
  
  if (sessionID % 5 == 0)
  {
      url = 'https://docs.google.com/forms/d/1iWraHfValU3pWwduBcgY1ylFycK09SC94rvlFDzpY-A/formResponse' 
  }
  else if (sessionID % 5 == 1)
  {
      url = 'https://docs.google.com/forms/d/166_whCzsiozwh6GGmiQNOufxtgOJz1nxUhL55UDDHVQ/formResponse'
  }
  else if (sessionID % 5 == 2)
  {
      url = 'https://docs.google.com/forms/d/1jqKHvVX7T2jn3uGml9qAkbgAw8q8wELYRT0xuscdcH4/formResponse'
  }
  else if (sessionID % 5 == 3)
  {
      url = 'https://docs.google.com/forms/d/1cBxMc1lU3YN8BTjCuSo03aUfwPp9kOgo0aWpn6-JCVE/formResponse'
  }
  else if (sessionID % 5 == 4)    
  {
      url = 'https://docs.google.com/forms/d/1KwStP7UHUMb3msHCyhRmSUn7U1rIgHTLY948TGZM76I/formResponse'
  }

  $.ajax({ 
    type: 'POST',
    url: url,
    data: {
      entry_1922161615: results.sessionID,
      entry_2059440561: results.bet,
      entry_162092526: results.amount,
      entry_1339010775: Math.max(outcome1.streak, outcome2.streak),
      entry_2045191426: results.responseTime
    }});

  g.roll(); 
  return false;
})