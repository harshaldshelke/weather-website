const request=require('request');


forcast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0b220669a03043184519fdedc119b5d4&query='+lat+','+ long +'&units=m';

    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to fetch location',undefined)
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out.`)
        }
    })

}

module.exports=forcast