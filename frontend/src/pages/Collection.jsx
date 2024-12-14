import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosArrowDropdown } from "react-icons/io";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products,search,showsearch } = useContext(ShopContext);
  const [filter, setfilter] = useState(false)
  const [filterproduct, setfilterproduct] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sorttype, setsorttype] = useState('relavent')
  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=> prev.filter(item=>item !== e.target.value))
    }
    else
    {
      setcategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    if(subcategory.includes(e.target.value)){
      setsubcategory(prev=> prev.filter(item=>item !== e.target.value))
    }
    else
    {
      setsubcategory(prev => [...prev,e.target.value])
    }
  } 

  
  //useEffect(() => {
  //  //console.log(category)
  //  console.log(subcategory)
  
  //// [category]
  //}, [subcategory])
  
  const applyFilter = () =>{
    let productCopy = products.slice();
    if(showsearch && search)
    {
      productCopy = productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if(subcategory.length > 0){
      productCopy = productCopy.filter(item => subcategory.includes(item.subcategory))
    }
    setfilterproduct(productCopy)
  }

  const sortProduct = ()=>{
    let fpCopy = filterproduct.slice()
    switch (sorttype) {
      case 'low-high':
        setfilterproduct(fpCopy.sort((a,b)=>(a.price - b.price)))
        break;
        case 'high-low':
          setfilterproduct(fpCopy.sort((a,b)=>(b.price - a.price)))
          break;  
    
      default:
        applyFilter();
        break;
    }
  }
  //useEffect(() => {
    
  //  setfilterproduct(products)
  //    not use if condition we create this
  //  }, [])
    useEffect(() => {
      
    applyFilter()
      
    }, [category,subcategory,search,showsearch,products])
    useEffect(() => {
      
    sortProduct();
      
    }, [sorttype])
    
    
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t">

      <div className="min-w-60">
        <p className="flex items-center cursor-pointer mt-3 gap-2 " onClick={()=>setfilter(!filter)}>Filter
        <IoIosArrowDropdown className={`sm:hidden ${filter ? 'rotate-90': ''}`}/>

        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${filter ? "": 'hidden'} sm:block`}>
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" name="" id="" value={'men'} onChange={toggleCategory}  />Men
          </p>
          <p className="flex gap-2">
            <input type="checkbox" name="" id="" value={'women'} onChange={toggleCategory} />Women
          </p>
          <p className="flex gap-2">
            <input type="checkbox" name="" id="" value={'kids'} onChange={toggleCategory}/>Kids
          </p>

        </div>
        </div>
        {/* sucategory*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${filter ? "": 'hidden'} sm:block`}>
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" name="" id="" value={'Topwear'} onChange={toggleSubCategory} />Topwear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" name="" id="" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" name="" id="" value={'Winderwear'} onChange={toggleSubCategory} />Winderwear
          </p>

        </div>
        </div>
      </div>

      {/*right side*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mt-4 mb-4">
          <Title text1={'All'} text2={'COLLECTION'}/>
          {/*sorting*/}
          <select onChange={(e)=>setsorttype(e.target.value)} name="" id="" className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort By: relavent</option>
            <option value="low-high">Sort By: low-high</option>
            <option value="high-low">Sort By: high-low</option>
          </select>
        </div>
        {/*Map Products*/}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 gap-y-6">
        {
          filterproduct.map((item,index)=>(
            <ProductItem
            key={index } // Handle both `id` and `_id`
            _id={item._id }
            image={item.image[0]}
            name={item.name}
            price={item.price}
          />
          ))
        }

        </div>
      </div>
    </div>
  );
};

export default Collection;
