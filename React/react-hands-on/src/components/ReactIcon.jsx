import reactLogo from '../assets/react.svg';

export const ReactIcon = () => {
  return (
    <>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <div>アイコンをクリックするとViteのサイトを開きます</div>
    </>
  );
};
