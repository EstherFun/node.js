const express = require('express');
//const mongoose = require('mongoose');
const app = express();
//mongoose.set('strictQuery', false);

//app.use(express.json());
//app.use(express.urlencoded({extended:true}));

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome!');
});
app.post('/', (req, res) => {
    res.send('This is a post request!');
});
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});

/*const customers = [
    {
        "name": "Caleb",
        "industry": "music"
    }
];


app.get('/api/customers', (req, res) => {
    res.send({"customers": customers});
});
app.post('/api/customers', (req, res) => {
    console.log(req, res);
    res.send(req.body);
});


const start = async() => {
    await mongoose.connect('mongodb+srv://EstherF:ecIPPDfSqcw8AKoF@cluster0.om2uzah.mongodb.net/?retryWrites=true&w=majority');

    app.listen(PORT, () => {
        console.log('App listening on port ' + PORT);
    });
};

start();*/
