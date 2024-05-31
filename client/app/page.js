"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const getResult = async () => {
    const response = await axios.get("http://localhost:9000/")
    const data = await response.data;
    console.log(data)
  }

  useEffect(()=>{
    getResult()
  },[])
  return (
    <div>
      
    </div>
  );
}
