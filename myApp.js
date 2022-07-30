const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));



var cash = 0;

var fruits = [
    { 
        fruit: "apple",
        available: 5,
        price: 1
    },
    {
        fruit: "orange",
        available: 3,
        price: 2
    },
    {
        fruit: "banana",
        available: 10,
        price: 3
    }
]


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/main.html');
})

app.get('/fruits/stock', (req,res) => {
    res.send(fruits);
})

app.get('/admin', (req,res) => {
    res.send(`Your cash: ${cash}`);
})


app.post('/buy', (req,res) => {
    let fruit = req.body.fruit;
    
    if(fruit != 0){
        if(buy(fruit) == "ok"){
            res.send(`done. get your ${fruit}`)
        }
        else{
            res.send("fruit not available")
        }
    
        
    }
    else{
        res.send('not valid fruit');
    }
})



const verify = (name) => {
    foundFruit = fruits.find((fruit) => fruit.fruit == name);

    if(foundFruit != undefined){
        if(foundFruit.available > 0){
            return "ok"
        }
    }
    

}

const buy = (name) => {
    if(verify(name) == "ok"){
        foundFruit = fruits.find((fruit) => fruit.fruit == name);
        foundFruit.available--;
        cash += Number(foundFruit.price);
        return "ok"
    }
}

app.use((req,res) => {
    res.status(404).send("not found");
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Wrong!');
  });
  



app.listen('3000' , () => console.log("escutando na porta 3000..."));
