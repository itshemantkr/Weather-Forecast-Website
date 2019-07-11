const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode') 
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'Chourasia'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is it...',
        title: 'help',
        name:'Hemant'
    })
})

app.get('', (req,res)=>{

    res.render('index',{
        title: 'Weather Title',
        name : 'Kr'
    })

})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({
        error: 'You must provide an address'
    })

    geocode (req.query.address, ( error , data ) =>{
        if(error){
            return res.send({
                error : error
            })
        }
        
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                forecast: forecastData,
                location: data.location
            })
            
          })
    })

    
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products: [ ]
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Hemant',
        errorMessage : 'Help Page Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Hemant',
        errorMessage : 'Page Not Found'
    })
})

app.listen(3000 , () =>{
    console.log('Sever is up')
})