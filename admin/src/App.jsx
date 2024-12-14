import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
export const backendUrl = import.meta.env.BACKEND_URL
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  useEffect(() => {
    localStorage.setItem('token',token)
  
    
  }, [token])
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer autoClose={2000}/>
      {token === "" ? (
        <Login settoken={settoken} />
      ) : (
        <>
          <NavBar settoken={settoken}/>
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vm,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
