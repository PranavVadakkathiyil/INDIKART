import { createContext, useEffect } from "react";
import products from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();
import axios from 'axios'

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);
  const [cartitem, setcartitem] = useState({});
  const [token, settoken] = useState('')
  //{after getting start to connect f and b}

  const [products, setproducts] = useState([])
  const navigate = useNavigate()
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartitem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setcartitem(cartData);
    if(token){
      try {
        await axios.post('/api/cart/add',{itemId, size},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        try {
          if (cartitem[items][item] > 0) {
            totalCount += cartitem[items][item];
          }
        } catch (error) {
            console.log(error)
        }
      }
    }
    return totalCount
  };
  //useEffect(() => {
  //  console.log(cartitem);
  //}, [cartitem]);
  
  const updateQuantity = async(itemId,size,quantity)=>{
    let cartData =structuredClone(cartitem);
    cartData[itemId][size]= quantity;
    setcartitem(cartData);
    if(token){
      try {
        await axios.post('/api/cart/update',{itemId,size,quantity},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }
  }
  const getCartAmount =()=>{
    let totalAmount=0;
    for(const items in cartitem){
      let itemInfo = products.find((products)=> products._id === items);
      for(const item in cartitem[items]){
        try{
          if(cartitem[items][item]>0){
            totalAmount += itemInfo.price * cartitem[items][item]
          }
        }
        catch(error){

        }
      }
      return totalAmount;
    }
  }
  const getProductData = async ()=>{
    try {
      const response = await axios.get('/api/product/list')
      console.log(response.data.message)
      if(response.data.success)
      {
        setproducts(response.data.message)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getUserCart = async (token)=>{
    try {
      const response = await axios.post('/api/cart/get',{},{headers:{token}})
      if(response.data.success)
      {
        setcartitem(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  useEffect(() => {
    getProductData()
  }, [])
  useEffect(() => {
    if(!token && localStorage.getItem('token'))
      settoken(localStorage.getItem('token'))
    getUserCart(localStorage.getItem('token'))
  }, [])
  
  
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartitem,
    setcartitem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    settoken,token
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
