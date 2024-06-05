const mongoose=require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Please add a name'],
        unique: true,
        trim:true,
        maxlength:[50 , 'Name can not be more than 50 characters']
    },
    address:{
        type:String,
        required:[true , 'Please add an address'],
    },
    district:{
        type:String,
        required:[true , 'Please add an distirct']
    },
    province: {
        type:String,
        required:[true , 'Please add an province']
    },
    postcode: {
        type:String,
        required:[true , 'Please add an postcode'],
        maxlength:[5 , 'Postcode can not be more than 5 digits']
    },
    tel:{
        type:String
    },
    religion:{
        type:String,
        required:[true , 'Please add an religion'],
    },
});

module.exports = mongoose.model('Hospital' , HospitalSchema)