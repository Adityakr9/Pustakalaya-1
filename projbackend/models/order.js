const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const ProductInCartSchema = new mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product"
    },
    name : String,
    count : Number,
    price : Number,
    size : String,

});

const ProductCart = mongoose.model("ProductCart",ProductInCartSchema);

const OrderSchema = new mongoose.Schema({
    products : [ProductInCartSchema],
    transaction_id : {},
    amount : {type : Number},
    //iscashondelivery : Boolean,
    address : {
       type : String,
       maxlength : 2000
    },
    status:{
        type: Stringd,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    updated : Date,
    user : {
        type : ObjectId,
        ref : "User"
    }
},
{timestamps : true}
);

const Order = mongoose.model("Order",OrderSchema);

// Store the two above schemas in variables Order and ProductCart thus
// exporting these two.
module.exports = { Order,ProductCart };