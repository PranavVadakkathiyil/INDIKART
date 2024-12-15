import { response } from 'express'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Strip from 'stripe'
import Razorpay from 'razorpay'
// global variables
const currency = 'inr'
const deliveryCharge = 10
//strip
const stripe = new Strip(process.env.STRIPE_SECRET_KEY) 

const razorpayInstence = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_SECRET_KEY,
}) 




// COD
const placeOrder = async (req,res)=>{
    try {
        const {userId,items,amount,address,paymentMethode}=req.body
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethode,
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({
            success:true,
            message:"Order placed"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
        
    }
}

const placeOrderStrip = async (req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        const {origin} = req.headers //hosted url is origin
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethode:"Stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity : item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:deliveryCharge * 100
            },
            quantity : 1
        })
        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({
            success:true,
            session_url:session.url
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}
const verifyStipe = async (req,res)=>{
    const {orderId,success,userId} = req.body
    console.log(orderId,success,userId);
    try { 
        if(success)
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({
                success:true
            })
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success:false,
                message:"order verification failed"
            })
        }
    } catch (error) {
        console.log(error.message)
    } 
}

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethode: "Razorpay",
            payment: false,
            date: Date.now(),
        };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        };
        console.log(options);

        await razorpayInstence.orders.create(options, (error, order) => {
            
            if (error) {
                console.log(error);
                return res.json({
                    success: false,
                    message: error
                });
            }

            return res.json({
                success: true,
                order
            });
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};
const verifyRazorpay = async (req,res)=>{
    try {
        const {userId,razorpay_order_id}=req.body
        const orderInfo = await razorpayInstence.orders.fetch(razorpay_order_id)
         if(orderInfo.status === 'paid' )
         {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({
                success:true,
                message:"payment successfull"
            })
         }
         else{
            res.json({
                success:false,
                message:"payment failed"
            })
         }
         
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
}


// All order data admin
const allOrder = async (req,res)=>{
     try {
        const orders = await orderModel.find({})
        res.json({
            success:true,orders
        })
     } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
     }
}

//order for user
const userOrder = async (req,res)=>{
    try {
        const {userId}=req.body
        const orders = await orderModel.find({userId})
        res.json({
            success:true,orders
        })
        
        
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// 
const updateStatus = async (req,res)=>{ 
    try {
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({
            success:true,
            message:"status updated"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}

export  {verifyRazorpay,verifyStipe,placeOrder,placeOrderStrip,placeOrderRazorpay,allOrder,userOrder,updateStatus} 