import express from 'express'
import { placeOrder, placeOrderStrip, placeOrderRazorpay, allOrder, userOrder, updateStatus, verifyStipe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router() 
//admin
orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatus)

//payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStrip)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//user feature

orderRouter.post('/userorders',authUser,userOrder)

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStipe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter
 