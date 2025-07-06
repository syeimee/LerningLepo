"use client"
import { useEffect, useState } from "react";

const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisble] = useState(false);

  useEffect(()=>{
    const timeout = setTimeout(() =>{setVisble(true),0});//0秒で() =>{setVisble(true)を実行
    return () => clearTimeout(timeout);
  },[]);
    return (
      // アニメーションの時間を1000msに設定してopacity（透明度）を変化させる時にアニメーションをつける
      <div className={`transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    );
  };

export default BodyWrapper;
  