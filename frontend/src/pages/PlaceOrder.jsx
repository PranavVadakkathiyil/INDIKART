import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { FaStripe } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { BsCashCoin } from "react-icons/bs";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const {
    navigate,
    token,
    cartitem,
    getCartAmount,
    setcartitem,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [method, setmethod] = useState("cod");
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformdata((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItems = [];
      for (const items in cartitem) {
        for (const item in cartitem[items]) {
          
          
          if (cartitem[items][item] > 0) {
            
           
            let itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            
            
            
            
            
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartitem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems);
      
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <p>delevier info</p>
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formdata.firstName}
            type="text"
            placeholder="Firat Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formdata.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formdata.email}
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formdata.street}
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formdata.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formdata.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formdata.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formdata.country}
            type="text"
            placeholder="country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formdata.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/*right side*/}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <p>PAYMENT METHOD</p>
          {/*Payment method selection*/}
          <div className="flex flex-col lg:flex-row">
            <div
              onClick={() => setmethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <FaStripe className="text-3xl" />
              Stripe
            </div>
            <div
              onClick={() => setmethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <SiRazorpay className="text-3xl" />
              Razorpay
            </div>
            <div
              onClick={() => setmethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <BsCashCoin className="text-3xl" /> Cash on delivery
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
