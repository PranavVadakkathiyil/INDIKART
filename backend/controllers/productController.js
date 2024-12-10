import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
// function add product
const addProduct = async (req,res)=>{
    try {
        const {name,description,price,category,subCategory,size,bestseller} = req.body
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]
        const images = [image1,image2,image3,image4].filter((item)=> item!==undefined)

        console.log(images)
        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        console.log(name,description,price,category,subCategory,size,bestseller);
        console.log(imageUrl)
        //res.json({})

        const productData = {
            name,description,price:Number(price),category,subCategory,size,bestseller:bestseller === 'true' ? true : false ,
            size:JSON.parse(size),
            image:imageUrl,
            Date:Date.now()
        }
        const product = new productModel(productData)
        await product.save()
        console.log(productData)
        res.json({
            success:true,message:"item added"
        })
    } catch (error) {
        res.json({
            success:false,message:error.message
        })
    }
}
// funtion for list product
const listProduct = async (req,res)=>{
    try {
        const product = await productModel.find({})
        res.json({
            success:true,message:product
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,message:error.message
        })
    }
}
// remove product
const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
    res.json({
        success:true,message:"product removd"
    })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,message:error.message
        })
    }
    
}

//functio for single product input

const singleProduct = async (req,res)=>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({
            success:true,product
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,message:error.message
        })
    }

}
export {addProduct,listProduct,removeProduct,singleProduct}
