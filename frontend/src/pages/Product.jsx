import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId}=useParams();
  //console.log(productId)
  const {products,currency,addToCart}=useContext(ShopContext)
  const [productData, setproductData] = useState(false);
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')
  const fetchProductData = async ()=>{
    products.map((item)=>{
      if(item._id===productId){
        setproductData(item)
        //console.log(item)
        setimage(item.image[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData()
  
    
  }, [productId,products])
  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100 '>
        {/*Product data*/}
        <div className='flex gap-12 sm:gap-12  flex-col sm:flex-row'>
          {/*Product Image*/}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div  className='flex sm:flex-col overflow-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setimage(item)}  src={item} key={index} alt="img" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                ))
              } 
            </div>
            <div className='w-full sm:w-[80%] '>
                  <img className='w-full h-auto ' src={image} alt="" />
            </div>

          </div>
          {/*product info*/}
          <div className='flex-1'>
                <h1 className='font-medium mt-2 text-2xl'>{productData.name}</h1>
                <div className='flex items-center gap-1 mt-2'>
                <FaStar className='text-yellow-400'/>
                <FaStar className='text-yellow-400'/>
                <FaStar className='text-yellow-400'/>
                <FaStar className='text-yellow-400'/>
                <FaStar className='text-yellow-100'/>
                <p className='pl-2'>(122)</p>
                

                </div>
                <p className='mt-5 font-medium text-3xl'>{currency}{productData.price}</p>
                <p className='mt-5 text-gray-500 md:w-4/5'>{productData.discription}</p>
                <div className='flex flex-row items-center  gap-4 my-8'>
                  <p>Select Size</p>
                  {
                    productData.size.map((item,index)=>(
                      <button  onClick={()=>setsize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500':''}`} key={index}>{item}</button>
                    ))
                  }
                </div>
          </div>
          <button onClick={()=> addToCart(productData._id,size)} className='bg-black text-white sm:h-5 sm:py-1 text-center px-8 py-4 text-sm active:bg-gray-700'>ADD TO CART </button>
          <hr className='mt-8 sm:4/5'/>
          <div className='text-sm text-gray-500 sm:mt-5 flex flex-col gap-1'>
            <p>100 % og</p>
            <p>Cash on delivey avilable</p>
            <p>Easy return and exchange</p>

          </div>
        </div>

        {/*dersciptoin and review*/}
        <div className='mt-20'>
          <div className='flex'>
            <p className='border px-5 py-3 text-sm'>
              Description
            </p>
            <p className='border px-5 py-3 text-sm'>
              Review(122)
            </p>

          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-gray-500  '>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, inventore voluptates? Aliquam assumenda impedit vitae laborum quae ipsam excepturi nam nesciunt blanditiis, fugiat veniam, at a ad iusto itaque magni!</p>
                  <p>E commerce Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti debitis perspiciatis unde culpa sapiente omnis a voluptatem vel quidem! Nobis blanditiis inventore, suscipit assumenda quod deserunt! Quaerat corrupti consectetur neque!</p>
          </div>
        </div>
        {/*related product*/}
        <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>
    </div>
  ):
  <div className='opacity-0'>

  </div>
}

export default Product