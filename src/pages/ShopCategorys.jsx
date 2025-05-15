import React from 'react'
import data from '../data.json'
import { useParams, Navigate } from "react-router-dom";

const validCategories = ["headphones", "earphones", "speakers"];

const ShopCategorys = () => {
    const { category } = useParams();

    if (!validCategories.includes(category)) {
      return <Navigate to="/error" />; 
    }
    
  return (
    <div>
      <h1>{data[1].id}</h1>
    </div>
  )
}

export default ShopCategorys
