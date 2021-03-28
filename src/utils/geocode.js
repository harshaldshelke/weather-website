const request=require('request');

geoCode=(address,callback)=>{
    const geoCodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFyc2hhbGRzaGVsa2UiLCJhIjoiY2tqaWs0MG1yMWE2NzJ6bG9yamNhMDN2ZCJ9.2VVPNdJYWUFfLaoNI5IbAA&limit=1'
       
    request({url:geoCodeUrl , json:true},(error,{body}={})=>{
        if(error){
            console.log('network issue')
            callback('unable to fetch location',undefined)
        }else if(body.features.length===0){
            callback("Unable to process location.Do proper search.",undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode