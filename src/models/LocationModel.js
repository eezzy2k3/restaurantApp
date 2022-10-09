const mongoose = require("mongoose")

const locationSchema = mongoose.Schema({
    restaurantName:String,
    address:{
        type:String,
        required:true
    },
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true,
            index:"2dsphere"
          },
          formattedAddress:String,
          street:String,
          city:String,
          state:String,
          zipcode:String,
          country:String
    }
    
},{timestamps:true})
locationSchema.pre("save",async function(next){
    
        this.address = undefined
     next()
 })


const Restaurant = new mongoose.model("Restaurant",locationSchema)


 




module.exports = Restaurant
