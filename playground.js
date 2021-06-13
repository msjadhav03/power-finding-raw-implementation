const formulas = require('./formulas')

//console.log(JSON.stringify(formulas.formulas.length))

const realFeature = {
    features:{
        current:{
            data:
            [
                {
                    value: 0.4
                },
                {
                    value : 0.4
                }
            ]
        },
        voltage:
        {
            data:
            [
                {
                    value : 0.5
                },
                {
                    value : 0.5
                }
            ]
        }
    }
}

const values = Object.keys(realFeature.features)
//console.log(values)
let formula = ""
for(let i=0;i<formulas.formulas.length;i++)
{
   
    const a = values.length
    let count = 0
    //console.log(a)
    //console.log(formulas.formulas[i].independant)
    if(a == formulas.formulas[i].independant.length)
    {    
        for(let j=0;j<values.length;j++)
        {
            for(let k = 0;k<values.length;k++)
            {   
                if(values[j]===formulas.formulas[i].independant[k])
                {
                    count ++
                }
            }
              
        
        }
           // console.log(count)
            if(count === a)
            {

                formula = formulas.formulas[i].formula
                
                //console.log(typeof(formulas.formulas[i].formula))
                break;
            } 
   
    }
}


console.log(formula)


/*
    k=0
    for(i=0;i<formula.length;i++)
    {

        if(formula[i]==='*' || formula[i]==='/'||formula[i]==='+'||formula[i]==='-'||formula[i]==='('||formula[i]===')')
        {
            c++;
            a[k] = formula[i]
        }
    }
*/
// current.data[current.data.length - 1] * volatage.data[voltage.data.length - 1]


















// formula[i].independant === values
//console.log(JSON.stringify(formulas.formulas[1].independant))

/*for(let i = 0;i<formulas.formulas.length;i++)
{
    if(formulas.formulas[i].independant == values)
    {
        console.log(formulas.formulas[i].formula)
    }else
    {
        console.log("formula not found")
    }
}*/

/*for(let j = 0;j< formulas.formulas.length;j++)
{
    console.log((formulas.formulas[j].independant).length)
    console.log(typeof(values.length))
    console.log(typeof(formulas.formulas[j].independant.length))
    let result = values.foreach((element)=>
    {
        console.log('entered in loop')
        return JSON.stringify(formulas.formulas[j].independant).includes(element)
    })
    console.log(result)
    if(result===true)
    {
        console.log(formulas.formulas[j].formula)
        break;
    }else
    {
        console.log('formula not found')
    }
}
console.log(values)
*/



