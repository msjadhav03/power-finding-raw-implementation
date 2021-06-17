const express = require('express')
const router = express.Router()

const startMqttConnection = require('../connect')

const MongoClient = require('mongodb').MongoClient

router.post('/:id',async(req,res,next)=>
{

    const id = req.params.id
    const client = new MongoClient('mongodb://localhost:27017',{useUnifiedTopology:true})
    await client.connect().then( result =>
        {
            console.log('Databse Connection Established')
        }).
        catch(error =>
        {
                console.log(error)
        })

    const database = await client.db('syntheticDemoDatabase')
    const collection = await database.collection('syntheticDemoCollection')
    collection.findOne({_id:id},(err,doc)=>
    {

        // get to know about how many synthetic feature we have
        const noOfSyntheticFeature = Object.keys(syntheticFeature).length
        const syntheticFeature = Object.keys(syntheticFeature)
        for(let i = 0;i<noOfSyntheticFeature;i++)
        {
            // finding formula for each feature and than evaluting
            let formula = doc.syntheticFeature[syntheticFeature[i]].formula
            var expr = new RegExp("(?<=[{(-+*/)}])|(?=[{(-+*/)}])") 
            let formulaSplitting = formula.split(expr)
            console.log(formulaSplitting)
            /*
            for(let i =0 ;i< Object.keys(feature).length;i++)
            {
                for(let j = 0;j<powerArray.length;j++)
                {
                    if(Object.keys(feature)[i] === powerArray[j])
                    {
                        console.log('Inside nested loop')
                        const variableDataLength = feature[Object.keys(feature)[i]].data.length - 1
                        console.log(feature[(Object.keys(feature)[i])].data[variableDataLength].value)
           
                        //console.log(variableDataLength)
                        //console.log(feature[Object.keys(feature)[i]])
                        //console.log(feature[(Object.keys(feature)[i])].data[(feature[Object.keys(feature)[i]].length) - 1])
                        powerArray[j] = feature[(Object.keys(feature)[i])].data[variableDataLength].value

         
            }
        }
    } */
    // you have set of synthetic features
            for(let i = 0;i<Object.keys(syntheticFeature);i++)
            {
                for(let j = 0; j < formulaSplitting.length;j++)
                {
                        if(Object.keys(syntheticFeature)[i] === formulaSplitting[j])
                        {   
                            
                            const variableDataLength = syntheticFeature[Object.keys(syntheticFeature).data.length - 1]
                            formulaSplitting[j] = syntheticFeature[(Object.keys(syntheticFeature)[i])].data[variableDataLength].value 


                        }
                }
            }
            console.log('formula after replacing variable by values',formulaSplitting)
            // converting formula splitted array toString()
            const formulaSplittingToString = formulaSplitting.toString()
            const formulaSplittingToStringWithoutComma = formulaSplittingToString.replace(/,/g, '')
            const afterEval = eval(formulaSplittingToStringWithoutComma)
            collection.updateOne({_id:id},{$set:{syntheticFeature:{}}})
            
        }

        // fetch formula
        

        // split formula

        // replace feature values


        // convert array to string

        // eval string
       // console.log(doc.syntheticFeature[Object.keys(doc.syntheticFeature)[0]])

        // length of synthetic feature 

        // formula for each synthetic feature 
        if(err)
        {
            console.log(err)
        }
        
        res.json(
            {
                data : doc
            }
        )
        // 
        client.close()
    })

})

module.exports = router