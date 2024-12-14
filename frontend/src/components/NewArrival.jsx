import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const NewArrival = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts, setlatestProducts] = useState([])
    useEffect(() => {
      
        setlatestProducts(products);
      
    }, [products]);
    
    console.log(latestProducts,"ss")
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title title1={'New'} title2={'Arrival'}/>
            <p className='w-3/4'>check new arrivel</p>

            

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 gap-y-5'>
        {
          latestProducts.map((item) => (
            <ProductItem
              key={item._id } // Handle both `id` and `_id`
              _id={item._id }
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))
        }
        </div>
    </div>
  )
}

export default NewArrival