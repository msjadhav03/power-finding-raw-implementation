const equation = "[(1+2)*3]";
const result = eval(equation)
const feature = 
{
    current:
    {
        data:
        [
            {
                value: 0.4
            },
            {
                value: 0.3
            },
            {
                value:22
            }
        ]

    },
    voltage:
    {
        data:
        [
            {
                value:5
            },
            {
                value: 5
            },
            {
                value: 55
            },
            {
                value: 7
            },
            {
                value: 8
            }
        ]
    }
}

// splitting formula into array of variable
const power = "{[(current*voltage)]}"
var expr = new RegExp("(?<=[{(-+*/)}])|(?=[{(-+*/)}])")  
console.log(expr)
const powerArray = power.split(expr)
console.log(powerArray)


// last data value in current and voltage

const lengthOfCurrentData = feature.current.data.length - 1
const lengthOfVoltageData = feature.voltage.data.length - 1

// comparing splitted array with real feature 
console.log(Object.keys(feature))

// first for loop unitl length of realFeature keys array length
// second loop array until length of splitted array formula length
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
}
console.log("after loop")
// convert to powerArray to string
const powerArrayString = powerArray.toString()
console.log("array to string",powerArrayString)
//          replace commas from converted string
//          for(let i = 0;i<powerArrayString.length;i++)
//          {
//              if(powerArrayString[i]==',')
//              {
//                  powerArrayString[i] = ' '
//              }
//          }
const powerArrayStringwithoutComma = powerArrayString.replace(/,/g, '')
// print powerArrayStringwithoutComma 
console.log(powerArrayStringwithoutComma)
// evaluate string
const evalPowerArrayStringwithoutComma = eval(powerArrayStringwithoutComma)
console.log(evalPowerArrayStringwithoutComma)
//console.log("answer after applying toString() to powerArray and also eval",eval(powerArray.toString().replace(',','')))


//  console.log(feature.current.data[lengthOfCurrentData].value)
const equationWithVariable = console.log(eval("[(feature.current.data[lengthOfCurrentData].value*feature.voltage.data[lengthOfVoltageData].value)]"))
//  const result2 = eval(equationWithVariable)
//  console.log(result2)
//  console.log(result)