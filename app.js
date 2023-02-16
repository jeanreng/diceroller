const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
  
app.get("/", function(req, res) {
    res.render("index", {
      rolls: [],
      numberOfDice: 1,
      typeOfDice: 20,
      totalOfRolls: 0,
      averageOfRolls: 0,
      finalValue: 0,
      highestRoll: 0,
      lowestRoll: 0,
      error: null
    });
  });
  
  app.post("/", function(req, res) {
    let numberOfDice = Number(req.body.numberOfDice);
    if (numberOfDice > 1000) {
      numberOfDice = 1000;
      error = `Maximum number of dice exceeded, changing ${req.body.numberOfDice} to 1000.`;
    } else if (numberOfDice < 1) {
      numberOfDice = 1;
      error = `Cannot roll less than 1 die, changing ${req.body.numberOfDice} to 1.`;
    } else {
      error = null;
    }
  
    let typeOfDice = Number(req.body.typeOfDice);
    let addToTotal = Number(req.body.addToTotal);
    let diceRolls = [];
    for (let i = 1; i <= numberOfDice; i++) {
      diceRolls.push(Math.floor(Math.random() * typeOfDice) + 1);
    }
    let totalOfRolls = diceRolls.reduce((sum, roll) => sum + Number(roll), 0);
    let averageOfRolls = totalOfRolls / numberOfDice;
    let finalValue = totalOfRolls + addToTotal;
    let sortedRoll = diceRolls.slice(0).sort((a, b) => a - b);
    let lowestRoll = sortedRoll[0];
    let highestRoll = sortedRoll[(sortedRoll.length) - 1];
  
    res.render("index", {
      rolls: diceRolls,
      numberOfDice: numberOfDice,
      typeOfDice: typeOfDice,
      totalOfRolls: totalOfRolls,
      averageOfRolls: averageOfRolls,
      finalValue: finalValue,
      highestRoll: highestRoll,
      lowestRoll: lowestRoll,
      error: error
    });
  });  

const port = 3000
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})
