const express = require('express')
const { MongoClient } = require('mongodb')
const router = express.Router()
const client = new MongoClient('mongodb://localhost:27017',{useUnifiedTopology:true})
router.post('/',async(req,res,next)=>
{
    const id = req.body.id
    await client.connect()
    .then((result)=>
    {
        console.log("Database connection established")
    })
    .catch((err)=>
    {
        console.log("Database connection failed")
    })
    const database = client.db('syntheticDemoDatabase')
    const collection = database.collection('syntheticDemoCollection')
    var expr = new RegExp("(?<=[{(-+*/)}])|(?=[{(-+*/)}])")  
    let valueAdded = []
    collection.findOne({_id:id},(err,doc)=>
    {
        if(err)
        {
            console.log(err)
        }else
        {
            let a = doc.hasOwnProperty('syntheticFeature')
            if(a === true)
            {
                let featuresKeys = Object.keys(doc.features)
                //console.log(featuresKeys)
                let features = Object.keys(doc.syntheticFeature)
                console.log(features)
                let lengthofFeatures = features.length
                console.log(lengthofFeatures)
                //cn.asyncGenerateRandomId()
                for(let k = 0; k < features.length;k++)
                {
                    let formula = doc.syntheticFeature[features[k]].formula
                    console.log("Finding synthetic value of ",features[k])
                    console.log("formula to be evaluated = "+formula)
                    let formulaArray = formula.split(expr)
                    //console.log("before replcement",formulaArray)
                    // replacement
                    for(let i = 0; i < formulaArray.length;i++)
                    {
                        for(let j = 0;j < featuresKeys.length;j++)
                        {
                            if(formulaArray[i]===featuresKeys[j])
                            {
                                let dataLengthOfFeature = doc.features[featuresKeys[j]].data.length - 1
                                formulaArray[i]=doc.features[featuresKeys[i]].data[dataLengthOfFeature].value
                                //console.log(dataLengthOfFeature)
                            }
                        }
                    }
                    //console.log("after replacement",formulaArray)
                    let formulaArrayToString = (formulaArray.toString()).replace(/,/g,'')
                    console.log(formulaArrayToString)
                    let result = eval(formulaArrayToString)
                    console.log("result = ",result)
                    valueAdded.push(result)
                    // add query here
                    // collection.updateOne(
                    //     {
                    //         _id:id
                    //     },
                    //             "":result    
                    //         }
                    //     }
                    // )

                    let featureLength = doc.syntheticFeature[features[k]].data.length - 1
               
                    console.log(featureLength)
                    console.log(doc.syntheticFeature[features[k]].data[featureLength].value)
                    
                    
                   
                //     //collection.updateOne({_id:id},{$set:{'doc.ab.$.sub1':result}})
                //     //collection.updateOne({_id:id},{$set:{syntheticFeature[features[k]].data[featureLength].value : result}})
                // }
                res.status(200).json(
                    {
                        message : "Some value has been added ",
                        valueAdded : valueAdded
                    }
                )
                //console.log(doc.features)
                //console.log(doc.syntheticFeature[features[0]].data)
            }else
            {
                res.status(401).json(
                    {
                        message : "Synthetic Features not present"
                    }
                )
            }
        }
    })
})
module.exports = router

    // collection.findOne({_id:id},(err,doc)=>
    // {

    //     // get to know about how many synthetic feature we have
    //     const noOfSyntheticFeature = Object.keys(syntheticFeature).length
    //     const syntheticFeature = Object.keys(syntheticFeature)
    //     for(let i = 0;i<noOfSyntheticFeature;i++)
    //     {
    //         // finding formula for each feature and than evaluting
    //         let formula = doc.syntheticFeature[syntheticFeature[i]].formula
    //         var expr = new RegExp("(?<=[{(-+*/)}])|(?=[{(-+*/)}])") 
    //         let formulaSplitting = formula.split(expr)
    //         console.log(formulaSplitting)
    //         /*
    //         for(let i =0 ;i< Object.keys(feature).length;i++)
    //         {
    //             for(let j = 0;j<powerArray.length;j++)
    //             {
    //                 if(Object.keys(feature)[i] === powerArray[j])
    //                 {
    //                     console.log('Inside nested loop')
    //                     const variableDataLength = feature[Object.keys(feature)[i]].data.length - 1
    //                     console.log(feature[(Object.keys(feature)[i])].data[variableDataLength].value)
           
    //                     //console.log(variableDataLength)
    //                     //console.log(feature[Object.keys(feature)[i]])
    //                     //console.log(feature[(Object.keys(feature)[i])].data[(feature[Object.keys(feature)[i]].length) - 1])
    //                     powerArray[j] = feature[(Object.keys(feature)[i])].data[variableDataLength].value

         
    //         }
    //     }
    // } */
    // // you have set of synthetic features
    //         for(let i = 0;i<Object.keys(syntheticFeature);i++)
    //         {
    //             for(let j = 0; j < formulaSplitting.length;j++)
    //             {
    //                     if(Object.keys(syntheticFeature)[i] === formulaSplitting[j])
    //                     {   
                            
    //                         const variableDataLength = syntheticFeature[Object.keys(syntheticFeature).data.length - 1]
    //                         formulaSplitting[j] = syntheticFeature[(Object.keys(syntheticFeature)[i])].data[variableDataLength].value 


    //                     }
    //             }
    //         }
    //         console.log('formula after replacing variable by values',formulaSplitting)
    //         // converting formula splitted array toString()
    //         const formulaSplittingToString = formulaSplitting.toString()
    //         const formulaSplittingToStringWithoutComma = formulaSplittingToString.replace(/,/g, '')
    //         const afterEval = eval(formulaSplittingToStringWithoutComma)
    //         //complete this **************************************************************
    //         collection.updateOne({_id:id},{$set:{syntheticFeature:{}}})
            
    //     }

    //     // fetch formula
        

    //     // split formula

    //     // replace feature values


    //     // convert array to string

    //     // eval string
    //    // console.log(doc.syntheticFeature[Object.keys(doc.syntheticFeature)[0]])

    //     // length of synthetic feature 

    //     // formula for each synthetic feature 
    //     if(err)
    //     {
    //         console.log(err)
    //     }
        
    //     res.json(
    //         {
    //             data : doc
    //         }
    //     )
    //     // 
   
