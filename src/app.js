const path=require('path')
const express= require('express')
const app=express()
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forcast=require('./utils/forecast')

const pth=path.join(__dirname,'../public')//render static files from the directory
const templtPath= path.join(__dirname,'../templates/views');
const partialHeaderPath= path.join(__dirname,'../templates/partials');
app.use(express.static(pth))

//to render dynamic by using hbs()handle bars
app.set('view engine','hbs')
app.set('views',templtPath)//if we changes 'views' directory name
hbs.registerPartials(partialHeaderPath)

app.get('',(req,res)=>{
    res.render('weather',{
        name:'Harshal',
        title:'Weather',
        weather:'Cloudy',
        location:'Jalgaon'
    })
})

app.get('/index',(req,res)=>{
    res.render('index',{
        title:'Weather Application',
        name:'Harshal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Harshal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Harshal',
        helpText:'This is actual help text you require'
    })
})

//notrmal static
// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send('help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('about page')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address not provided'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forcast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            
            res.send({
                Title:'Weather page',
                weather:forecastData,
                location:location
            })
            // console.log(location);
            // console.log(forecastData);
        })
    })
   
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        name:'Harshal',
        title:'ErrorPage',
        errorMsg:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        name:'Harshal',
        title:'ErrorPage',
        errorMsg:'Page not found.'
    })
})

app.listen(3000,()=>{
    console.log('server is listning at port 3000') 
})