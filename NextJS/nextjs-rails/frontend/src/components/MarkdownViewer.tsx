import React, { useState } from 'react';

interface MarkdownViewerProps {
  html: string;
  url: string;
  markdown: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ html, url, markdown }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className='mt-6 bg-custom-gray p-4'>
      <h2 className='text-center text-3xl'>出力結果</h2>
      <div className='flex justify-end'>
        <button 
          onClick={handleCopy} 
          className={`mt-2 px-4 py-1 rounded ${copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'} text-white transition`}
        >
          COPY
        </button>
      </div>
      <p className='text-left'>引用: {url}</p>
      <div className="markdown-content text-left" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default MarkdownViewer;
