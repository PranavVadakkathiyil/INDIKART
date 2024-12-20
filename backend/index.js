import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connnectCloudinary from './config/cloudinary.js'
import productModel from './models/productModel.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
// App config
const app =express()
const PORT = process.env.PORT || 4000
connectDB()
connnectCloudinary()

// MiddleWares

app.use(express.json())
app.use(cors())

// api endpoint

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)  

app.get('/',(req,res)=>{
    res.send("Api Working")
})
app.listen(PORT,()=>{
    console.log(`server working on http://localhost:${PORT}`)
})



//first create config file for mongodb and cloude
//then create models in model file for user and productModeland make controller for each users and product
// add controller connection to route
//route to index file
//middle waer for add product using multer