'use client';
import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps{
    markdown: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({markdown}) =>{
    return(<ReactMarkdown>{markdown}</ReactMarkdown>);
}

export default MarkdownViewer;