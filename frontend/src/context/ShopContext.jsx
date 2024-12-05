import { createContext, useEffect } from "react";
import products from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);
  const [cartitem, setcartitem] = useState({});
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
  useEffect(() => {
    console.log(cartitem);
  }, [cartitem]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartitem,
    addToCart,
    getCartCount
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;