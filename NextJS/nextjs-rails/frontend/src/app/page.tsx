'use client';
import { useState } from "react";
import axios from 'axios';
import React from "react";
import MarkdownViewer from "@/components/MarkdownViewer";

export default function Home(){
    const [url, setUrl] = useState('');
    const [html, setHtml] = useState('');
    const [markdown, setMarkdown] = useState('');
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const url = e.target.value;
        setUrl(url);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3001/api/convert', {url})
            console.log(response.data);
            setHtml(response.data.html);
            setMarkdown(response.data.markdown);

        }catch(error){
            console.error("HTMLからMarkdownの変換に失敗しました", error);
        }

    }

    return(
        <div className="flex justify-center text-center">
          <div className="mt-12 w-full max-w-2xl px-4">
            <h1 className="text-2xl font-bold mb-4">マークダウン生成ツール</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
              <input type="text" value={url} placeholder="URLを入力" onChange={onChange} className="w-full max-w-md p-2 border  text-gray-700 focus:text-black  border-gray-300 rounded"/>
              <button type="submit" className="px-4 py-2 bg-light-blue text-white rounded hover:bg-yellow-300 transition">CONVERT</button>
            </form>
            {html && <MarkdownViewer html={html} markdown={markdown} url={url}/>}
          </div>
        </div>
    );
}