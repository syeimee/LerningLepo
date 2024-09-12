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
      <h2 className='mt-4 text-center text-3xl'>出力結果</h2>
      <div className='mt-4 bg-blue-950'>
        <button 
          onClick={handleCopy} 
          className={`items-end justify-end mt-2 px-4 py-1 rounded ${copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'} text-white transition`}
          >COPY</button>
        <div className="markdown-content text-left" dangerouslySetInnerHTML={{ __html: html }} />
        <p>引用: {url}</p>
      </div>
    </div>
  );
};

export default MarkdownViewer;
