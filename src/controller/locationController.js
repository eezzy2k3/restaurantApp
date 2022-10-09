const Restaurant = require("../models/LocationModel")

const geocoder = require("../utils/geocoder")


const createRestaurant = async(req,res)=>{
    try {
          // use node-geocoder to get formatted address
          const loc = await geocoder.geocode(req.body.address)
          let location = {
              type : "Point",
              coordinates:[loc[0].longitude,loc[0].latitude],
              formattedAddress:loc[0].formattedAddress,
              street:loc[0].streetName,
              city:loc[0].city,
              state:loc[0].stateCode,
              zipcode:loc[0].zipcode,
              country:loc[0].countryCode
          }
             
          req.body.location = location
             
            
              // create a new restaurant
               const restaurant = await Restaurant.create(req.body)
             
              res.status(201).json({success:true,data:restaurant})  
         
    } catch (error) {
        console.log(error.message)
    }
}

const restaurant = async(req,res)=>{
    try {
        
        //    use geo-code to get latitude and longitude
        const {zipcode,distance, unit} = req.params
       const loc =await geocoder.geocode(zipcode)
       const lat = loc[0].latitude
       const lng = loc[0].longitude
       let radius;
      
  
       //    divide distance by the radius of earth to get the radius either in km/mi
       if(unit == "km"){
           radius = distance/6378
       }if(unit == "mi"){
           radius=distance/3963
       }
      
    //   find restaurant  within location
       const restaurant = await Restaurant.find({
        location : { $geoWithin: { $centerSphere: [ [lng,lat], radius] } }
     })

    
     res.status(200).json({success:true,Number:restaurant.length,data:restaurant})
    } catch (error) {
        res.json(error.message)
        console.log(error.message)
    }
}


module.exports = {createRestaurant,restaurant}