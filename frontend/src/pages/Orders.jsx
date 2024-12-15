import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';
const Orders = () => {
  
  const {token,currency}=useContext(ShopContext)
  const [orderdata, setorderdata] = useState([])
  let payment = ''
  const loadOrderData = async()=>{
    try {
      if (!token) {
        return null
      }
      const response = await axios.post('/api/order/userorders',{},{headers:{token}})
      console.log(response.data.orders);
      
      if(response.data.success){
        let allOrdersItem =[]
        response.data.orders.map((order)=>{
          console.log(order.payment);
          let payment = order.paymentMethode
          console.log(payment);
          

          
            order.items.map((item)=>{
              item['status']=order.status
              item['payment']=order.payment
              item['paymentMethod']=order.paymentMethode
              item['date']=order.date
              allOrdersItem.push(item)
            })
        })
        setorderdata(allOrdersItem.reverse());
        
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(() => {
    loadOrderData()
  }, [token])
  
  //console.log(products)
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl '>
        <p>My Orders</p>

      </div>
      <div >
        {
          orderdata.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20'  src={item.image[0]} alt="img" />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex item-center gap-3 mt-3 text-base text-gray-700'>
                      <p className='text-lg'>{currency} {item.price}</p>
                      <p>Quantity :{item.quantity}</p>
                      <p>Size : {item.size}</p>
                    </div>
                    <p className='mt-2'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-2'>Payment Method : {item.paymentMethode} <span className='text-gray-400'>{item.paymentMethod}</span></p>

                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track order</button>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders