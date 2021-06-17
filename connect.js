const mqtt = require('mqtt')
const Promise = require('bluebird')
const parseAsync = Promise.method(JSON.parse);

const options = {
    "clientId":"syntheticTesting",
    "username":"syntheticTesting",
    "password":"backendSyntheticTesting",
    "rejectUnauthorized":false

}

const startMqttConnection = async() =>
{
    client = await mqtt.connect('mqtt://143.110.190.54:8883',options);

    client.on('connect', () => {
        client.subscribe('#');
    })


    client.on('message',(topic,message)=>
    {
        console.log("topic on message received is ",topic.split('/')[2])
       
        parseAsync(message.toString()).then(function(parsedData){
            console.log("message received is ", parsedData)
        })

    })
    
    client.on("error",(err)=>
    {
        console.log(err)
    })
    client.on("disconnect",(packet)=>
    {
        console.log('Disconnected from MQTT and packet received',packet)
    })
}

module.exports = startMqttConnection





