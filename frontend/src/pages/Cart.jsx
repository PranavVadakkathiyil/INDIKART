import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { MdDelete } from "react-icons/md";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartitem,updateQuantity,navigate } = useContext(ShopContext);
  const [cartData, setcartData] = useState([]);
  useEffect(() => {
    
    const tempData = [];
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        if (cartitem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartitem[items][item],
          });
        }
      }
    }
    //console.log(tempData)
    setcartData(tempData);
  }, [cartitem,products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <p className="text-3xl">Cart</p>
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return(
            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ">
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt="img" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency} {productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input onChange={(e)=>e.target === ''|| e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className="border max-w-10 sm:max-w-2 px-4 sm:px-[1.9rem] py-1" type="number" min={1} defaultValue={item.quantity} />
              <MdDelete onClick={()=>updateQuantity(item._id,item.size,0)} className="cursor-pointer" />

            </div>
          )
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px] ">
          <CartTotal/>
          <div className="w-full tex-end">
            <button onClick={()=>navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
