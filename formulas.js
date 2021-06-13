const formulas = {
    formulas:
    [
        {
            "independant": ["current","resistance"],
            "depedant":["power"],
            "formula":"(current*current*resistance)"
        },
        {
           "independant": ["voltage","current"],
            "depedant":["power"],
            "formula":"(voltage*current)" 
        }
                    /*
                        ["voltage","resistance","voltage/resistance","current"]
                    ,
                    
                        ["power","voltage","power/voltage","current"]
                    ,
                    
                        ["current","resistance","current*resistance","voltage"]
                    ,
                    
                        ["power","current","power/current","voltage"]
                    ,
                    
                        ["voltage","current","voltage/current","resistance"]
                    ,
                    
                        ["power","current","power/current*current","resistance"]
                    ,
                    
                        ["voltage","power","voltage*voltage/power","resistance"]
                    ,
                    
                        ["voltage","current","voltage*current","power"]
                    ,
                    
                        ["current","resistance","current*current*resistance","power"]
                        */
                    
                    
    ]      
    
}
/*
{
    "independant": ["current","resistance"],
    "depedant":["power"],
    "formula":"(current*current*resistance)"
},
{
   "independant": ["voltage","current"],
    "depedant":["power"],
    "formula":"(voltage*current)" 
}
 */

module.exports = formulas