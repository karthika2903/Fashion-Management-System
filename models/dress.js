const mongoose= require('mongoose');

const dressSchema= new mongoose.Schema({
    name: String,
    type: String,
    complimentary:String,
    pickCount:{type:Number,default:0}
});

module.exports= mongoose.model('Dress',dressSchema);
