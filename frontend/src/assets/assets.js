import shirt from './shirt.jpg'
import tshirt from './t-shirt.jpg'
export const assets = {
    shirt,
}
 const products = [
    {
        id:"1",
        name:"shirt man",
        discription:'good',
        price:"1200",
        image: [shirt,shirt,shirt,shirt],
        category:"man",
        subcategory:"Topwear",
        size:["S","M","L","XL"],
        date:"121212",
        bestseller:"false"



    },
    {
        id:"2",
        name:"t-shirt women",
        discription:'good',
        price:"700",
        image:[tshirt,shirt,tshirt,shirt],
        category:"women",
        subcategory:"Bottomwear",
        size:["S","M","L","XL"],
        date:"121212",
        bestseller:"true"



    },
    {
        id:"3",
        name:"t-shirt kids",
        discription:'good',
        price:"400",
        image:[tshirt,shirt,tshirt,shirt],
        category:"kids",
        subcategory:"Winderwear",
        size:["S","M","L","XL"],
        date:"121212",
        bestseller:"true"



    },
    {
        id:"4",
        name:"t-shirt women",
        discription:'good',
        price:"200",
        image:[tshirt,shirt,tshirt,shirt],
        category:"women",
        subcategory:"Winderwear",
        size:["S","M","L","XL"],
        date:"121212",
        bestseller:"true"



    }
]
export default products