import React, {useState} from 'react';

interface MarkdownViewerProps {
  html: string;
  url: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ html, url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = ()=>{
    navigator.clipboard.writeText(html).then(() =>{
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });    
  }

  return (
    <div className='items-end justify-end'>
      <h2 className='text-left'>出力結果</h2>
      <button 
        onClick={handleCopy} 
        className={`px-4 py-2 rounded ${copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'} text-white transition`}
      >COPY</button>
      <div className="markdown-content text-left bg-slate-700" dangerouslySetInnerHTML={{ __html: html }} />
      <p>引用: {url}</p>
    </div>
  );
};

export default MarkdownViewer;
