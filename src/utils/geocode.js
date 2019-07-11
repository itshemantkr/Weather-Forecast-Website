const request = require('request')

const geocode = (address , callback ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaW1oZW1hbnQiLCJhIjoiY2p4b2Q4YTVlMDI0bjNpbzJ0MXgyemp4bCJ9.kh9DvjTZcw69x01zB-d9dQ&limit=1'

    request( { url : url , json : true } , (error,response) => {

        if(error){
             callback('Please check your Internet Connecion' , undefined )
        }else if(response.body.features.length==0){
                callback('City Not Found' , undefined )
        }else{
            callback( undefined , {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            } )
            
        }
        
    } )

}

module.exports = geocode 