import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setbestseller] = useState([]);
  useEffect(() => {
    const bestproduct = products.filter((item) => item.bestseller);
    setbestseller(bestproduct.slice(0, 2));
  }, []);

  return (
    <div className="my-10">
      <div className="text-3xl py-8 text-center">
        <Title text1={'Best'} text2={'seller'} />
        <p className="w-3/4 m-auto text-xs text-gray-300">
          Lorem ipsum dolor sit.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {
            bestseller.map((item,index)=>(
                <ProductItem
              key={index } // Handle both `id` and `_id`
              id={item.id }
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
            ))
        }
      </div>
    </div>
  );
};

export default Bestseller;
