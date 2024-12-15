import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
    const {navigate,token,setcartitem} =useContext(ShopContext)
    const [searchParams, setsearchParams] = useSearchParams()
    const success =searchParams.get('success')
    const orderId =searchParams.get('orderId')
    
    
    const verifyPayment =async ()=>{
        try {
            if(!token){
                return null
            }
            const response = await axios.post('/api/order/verifyStripe',{success,orderId},{headers:{token}})
            console.log(response.data.message);
            
            if(response.data.success){
                setcartitem({})
                navigate('/orders')

            }
            else{
                navigate('/cart')
                console.log(response.data.message);
                
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
             
        }
    }
    useEffect(() => {
      verifyPayment()
    }, [token]) 
    
  return ( 
    <div></div>
  )
}

export default Verify