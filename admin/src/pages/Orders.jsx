import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBox } from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);
  const fetchAllorders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data.orders);
      if (response.data.success) {
        setorders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const statusHandler = async(e,orderId)=>{
    try {
      
      const response = await axios.post('/api/order/status',{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllorders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }
  useEffect(() => {
    fetchAllorders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <FaBox className="text-[2rem] m-auto"/>

            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>{order.address.street + ","}</div>
              <div>
                {order.address.city +
                  "," +
                  order.address.state +
                  "," +
                  order.address.country +
                  "," +
                  order.address.zipcode}
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethode}</p>
              <p>Payment : {order.payment ? 'Done' : 'pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">$  {order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className="p-2 font-semibold" name="" id="">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default Orders;