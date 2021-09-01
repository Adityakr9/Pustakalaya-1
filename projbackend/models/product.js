const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxlength : 32
    },
    description : {
        type : String,
        trim : true,
        required : true,
        maxlength : 2000
    },
    price : {
        type : Number,
        trim : true,
        required : true,
        maxlength : 2000
    },
    category : {
        type : ObjectId,   // here we are taking category from another schema 
        ref : "Category",  // and we are giving reference to that schema (category)
        required : true
    },
    stock : {
        type : Number,
    },
    sold : {
        type : Number,
        default : 0
    },
    // using mongoose schema for images
    photo : {
        data : Buffer,
        contentType : String
    },
    size : {
        type : String,
        maxlength : 32
    },
    color : {
        type : String,
        maxlength : 32
    }

},{timestamps : true}
);

module.exports = mongoose.model("Product", productSchema);