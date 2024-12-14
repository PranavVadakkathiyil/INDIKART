import React, { useState } from "react";
import { MdOutlineUploadFile } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [image1, setimage1] = useState(null);
  const [image2, setimage2] = useState(null);

  const [image3, setimage3] = useState(null);

  const [image4, setimage4] = useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("men");
  const [subCategory, setsubCategory] = useState("topwear");
  const [bestseller, setbestseller] = useState(false);
  const [size, setsize] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault ();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("size", JSON.stringify(size));
      formData.append("bestseller", bestseller);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);

      image3 && formData.append("image3", image3);

      image4 && formData.append("image4", image4);
      const response = await axios.post("/api/product/add", formData, {
        headers: { token },
      });
      if(response.data.success){
      toast.success(response.data.message)
      setname('')
      setdescription('')
      setimage1(false)
      setimage2(false)
      setimage3(false)
      setimage4(false)
      setprice('')
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      action=""
      className="flex flex-col w-full items-start gap-3"
    >
      <div className="">
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            {!image1 ? (
              <MdOutlineUploadFile className="border sm:text-[3rem] text-3xl" />
            ) : (
              <img
                src={URL.createObjectURL(image1)}
                alt="d"
                className="border max-w-[40px]"
              />
            )}

            <input
              onChange={(e) => setimage1(e.target.files[0])}
              type="file"
              name=""
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            {!image2 ? (
              <MdOutlineUploadFile className="border sm:text-[3rem] text-3xl" />
            ) : (
              <img
                src={URL.createObjectURL(image2)}
                alt="d"
                className="border max-w-[40px]"
              />
            )}
            <input
              onChange={(e) => setimage2(e.target.files[0])}
              type="file"
              name=""
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            {!image3 ? (
              <MdOutlineUploadFile className="border sm:text-[3rem] text-3xl" />
            ) : (
              <img
                src={URL.createObjectURL(image3)}
                alt="d"
                className="border max-w-[40px]"
              />
            )}
            <input
              onChange={(e) => setimage3(e.target.files[0])}
              type="file"
              name=""
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            {!image4 ? (
              <MdOutlineUploadFile className="border sm:text-[3rem] text-3xl" />
            ) : (
              <img
                src={URL.createObjectURL(image4)}
                alt="d"
                className="border max-w-[40px]"
              />
            )}
            <input
              onChange={(e) => setimage4(e.target.files[0])}
              type="file"
              name=""
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          type="text"
          placeholder="Type Name"
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Description"
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setcategory(e.target.value)}
            value={category}
            name=""
            id=""
            className="w-full px-3 py-2"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Subcategory</p>
          <select
            onChange={(e) => setsubCategory(e.target.value)}
            value={subCategory}
            name=""
            id=""
            className="w-full px-3 py-2"
          >
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winderwear">Winderwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setprice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            name=""
            id=""
            placeholder="price"
          />
        </div>
        <div>
          <p>Product Size</p>
          <div className=" flex gap-2">
            <div>
              <p
                onClick={() =>
                  setsize((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"]
                  )
                }
                className={`${
                  size.includes("S") ? "bg-pink-200" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setsize((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"]
                  )
                }
                className={`${
                  size.includes("M") ? "bg-pink-200" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setsize((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"]
                  )
                }
                className={`${
                  size.includes("L") ? "bg-pink-200" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setsize((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"]
                  )
                }
                className={`${
                  size.includes("XL") ? "bg-pink-200" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setsize((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"]
                  )
                }
                className={`${
                  size.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setbestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            name=""
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to Bestseller
          </label>
        </div>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
