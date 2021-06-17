const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(express.json())
app.use(express.urlencoded({extended:false}))


const getFormula = require('./routes/getFormula')
const generateSyntheticData = require('./routes/generateSyntheticData')

app.use('/getFormula',getFormula)
app.use('/generateSyntheticData',generateSyntheticData)

const client = new MongoClient('mongodb://localhost:27017',{useUnifiedTopology:true})
client.connect().then(result =>
    {
        console.log('Databse Connection Established')
    }).
    catch(error =>
    {
            console.log(error)
    })



app.use('/',(req,res,next)=>
{
    res.json(
        {
            message:"Page not found"
        }
    )
})



module.exports = app