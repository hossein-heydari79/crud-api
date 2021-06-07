const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

let array = [];

app.get('/api', (req, res) => {

    if (req.headers.api_key) {
        let item = array.find((item) => item.api_key == req.headers.api_key);
        if (item) {
            res.send(item.data);
        }
        else {
            res.send("data not exist!");
        }
    }
    else {
        res.send("api_key not found!");
    }

})

app.post('/api', (req, res) => {

    let key = array.find(item => item.api_key == req.headers.api_key);

    if (key) {
        res.send("data with this api_key exist!");
    }
    else {
        if (req.headers.api_key) {
            array.push({ api_key: req.headers.api_key, data: { ...req.body } });
            res.send("data added");
        }

        else {
            res.send("api_key not found!");
        }
    }


})


app.delete('/api', (req, res) => {
    if (req.headers.api_key) {
        let index = array.findIndex((item) => item.api_key == req.headers.api_key);
        if (index != -1) {
            array.splice(index, 1);
            res.send("data deleted!");
        }
        else {
            res.send("data not exist!");
        }
    }
    else {
        res.send("api_key not found!");
    }
})



app.put('/api', (req, res) => {

    if (req.headers.api_key) {
        let index = array.findIndex((item) => item.api_key == req.headers.api_key);
        if (index != -1) {
            array[index].data = { ...array[index].data, ...req.body };
            res.send("data changed!");
        }
        else {
            res.send("data not exist!");
        }
    }
    else {
        res.send("api_key not found!");
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})