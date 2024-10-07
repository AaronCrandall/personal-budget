// Budget API
const mongoose = require('mongoose');
const validator = require('validator');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    hex: {
        type: String,
        //validate: {
        //    validator: validator.isHexadecimal
        //},
        minLength: 6,
        maxLength: 6,
        required: true
    }
},{collection: 'Budget'})

const budgetModel = mongoose.model("Budget", budgetSchema)

app.use(cors());
app.use('/', express.static('public'));

const budget = require('./data.json');



app.get('/budget', async(req, res) => {
    mongoose.connect('mongodb://localhost:27017/PB').then(() => {
        console.log("Connected to DB")
        budgetModel.find({})
            .then((data)=>{
                res.json(data);
            })
    });

})

app.post('/newData', async(req, res) => {
    mongoose.connect('mongodb://localhost:27017/PB').then(() => {
        console.log("Updating");
        console.log(req.query);
        budgetModel.create(req.query).then(()=>{
            res.status(200).json({
                message: 'Data received successfully'
            })
        })
    })
})

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});