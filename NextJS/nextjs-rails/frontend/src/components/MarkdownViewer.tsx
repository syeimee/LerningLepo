import React from 'react';

interface MarkdownViewerProps {
  html: string;
  url: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ html, url }) => {
  return (
    <div>
      <h2>出力結果</h2>
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
      <p>引用: {url}</p>
    </div>
  );
};

export default MarkdownViewer;
