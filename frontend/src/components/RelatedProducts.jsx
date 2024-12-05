import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from './ProductItem';
const RelatedProducts = ({category,subcategory}) => {
    const {products} = useContext(ShopContext);
    const [related, setrelated] = useState([])
    useEffect(() => {
      if(products.length > 0)
      {
        let productCopy= products.slice();
        productCopy = productCopy.filter((item)=> category === item.category)
        productCopy = productCopy.filter((item)=> subcategory === item.subcategory)
        //console.log(productCopy.slice(0,4))
        setrelated(productCopy.slice(0,4))
      }
    
    }, [products])
    
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'Realated'} text2={'Products'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-col-3'>
            { related.map((item,index)=>(
                    <ProductItem
              key={index } // Handle both `id` and `_id`
              id={item.id }
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
                ))}
        </div>
    </div>
  )
}

export default RelatedProducts