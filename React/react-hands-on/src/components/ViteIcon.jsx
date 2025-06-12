import viteLogo from '/vite.svg';
import style from './ViteIcon.module.css';

export const ViteIcon = () => {
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <div className={style['text-bold']}>
        アイコンをクリックするとViteのサイトを開きます
      </div>
    </div>
  );
};
