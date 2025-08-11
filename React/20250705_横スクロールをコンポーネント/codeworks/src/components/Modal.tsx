'use client';
import { useEffect, useState } from 'react';

const Modal = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const onClick = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setContent(`スライド番号: ${detail.index}`);
      setVisible(true);
    };

    window.addEventListener('slideClick', onClick);
    return () => window.removeEventListener('slideClick', onClick);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow relative max-w-md w-full">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-xl"
        >
          ×
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
