const request = require('request')


const forecast = (lattitude , longitude , callback) => {

    const url = 'https://api.darksky.net/forecast/588b89fc0017b0a9a35d08874e309dd2/' + lattitude +',' + longitude +'?units=si'

    request( { url : url , json : true } , (error,response) => {

        if(error){
            callback( 'Please check your Internet Connecion' , undefined )
        }else if( response.body.error ){
            callback( response.body.error, undefined )
        }else
        callback( undefined , response.body.daily.data[0].summary + ' It is currently '+ response.body.currently.temperature + ' out.' + 'There is a ' + response.body.currently.precipProbability  + '% chance of rain'  )
    
    } )

}

module.exports = forecast