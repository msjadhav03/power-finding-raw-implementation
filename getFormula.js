const express = require('express')
const { MongoClient } = require('mongodb').MongoClient
const router = express.Router()



router.post("/",async(req,res,next)=>
{
    // establish database conenction

    const client = new MongoClient('mongodb://localhost:27017',{useUnifiedTopology:true})
    await client.connect().then((result)=>
    {
        console.log('Database connecton Successful')
    }).catch((err)=>
    {
        console.log(err)

    })
    const db = await client.db('syntheticDemoDatabase')
    const collection = await db.collection('syntheticDemoCollection')
    // take formula from request body and for which formula is dependent
    /*{
         deviceId : "jdjjjdgjkdgqweoiqpws"
         formulaOf : "power",
         formula : current0002*voltage123
    }*/
    const deviceId = req.body.deviceId
    const formulaOf = req.body.formulaOf
    const formula = req.body.formula

    // add check for synthetic Feature field
    collection.findOne({_id:deviceId},(err,doc)=>
    {
        if(doc.hasOwnProperty('syntheticFeature'))
        {
            // check for formula present 
            // find length of syntheticFeature , knowing how many synthetic feature are present
            const syntheticFeatureLength = Object.keys(syntheticFeature)
            console.log(syntheticFeatureLength)
            // iterating over each key and comparing it
            // check for formula present for corresponding synthetic feature
            if(doc.syntheticFeature.hasOwnProperty(formulaOf))
            {
                collection.updateOne({_id:deviceId},{$set:{formulaOf : {formula:formula}}},(err,doc)=>
                {
                        
                    if(err)
                    {
                        console.log(err)
                    }
                    else
                    {
                        console.log("Document updated successfully")
                        console.log(doc)
                    }
                })
            }
            else
            {
                doc.syntheticFeature.formulaOf = {}

            }
           

        }else
        {
            // add all the fields 
            // syntheticFeature , formulaOf, featureId, name, unit, formula, data
            doc.syntheticFeature = {}
            doc.syntheticFeature.formulaOf = {}
            doc.syntheticFeature.formulaOf.featureId = "aYDsE"
            doc.syntheticFeature.formulaOf.name = formulaOf
            doc.syntheticFeature.formulaOf.unit = "unit"
            doc.syntheticFeature.formulaOf.formula = formula
            doc.syntheticFeature.formulaOf.data = []


        }
    })

    // add check for formula present for particular syntheticFeature




})






module.exports = router