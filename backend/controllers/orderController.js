import { response } from 'express'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Strip from 'stripe'
// global variables
const currency = 'inr'
const deliveryCharge = 10
//strip
const stripe = new Strip(process.env.STRIPE_SECRET_KEY)




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
        console.log(error);
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
                currency:"$",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity : item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"$",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:item.price * 100
            },
            quantity : item.quantity
        })

    } catch (error) {
        
    }
}

const placeOrderRazorpay = async (req,res)=>{
    
}

// All order data admin
const allOrder = async (req,res)=>{
     try {
        const orders = await orderModel.find({})
        res.json({
            success:true,orders
        })
     } catch (error) {
        console.log(error);
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
        console.log(userId);
        
    } catch (error) {
        console.log(error);
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
        response.json({
            success:true,
            message:"status updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

export  {placeOrder,placeOrderStrip,placeOrderRazorpay,allOrder,userOrder,updateStatus} 