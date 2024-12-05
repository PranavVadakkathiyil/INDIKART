import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <p>cart</p>
        </div>
    <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>SubTotal</p>
            <p>{currency} {getCartAmount()}.00</p>
            <hr />
            <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency} {delivery_fee}</p>

            </div>
            <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</p>

            </div>
        </div>

    </div>
    </div>
  )
}

export default CartTotal