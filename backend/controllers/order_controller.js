const orderModel = require('../models/order_model');

class Order{
    static getUserOrders = async(req,res)=>{
        const userId = req.user._id;
        try{
            const orders = await orderModel.find({userId});
            res.status(200).send({success:true, data:orders});
        }catch(err){
            res.status(500).send({status:false, msg:err.message})
        }
    }
}

module.exports = Order;