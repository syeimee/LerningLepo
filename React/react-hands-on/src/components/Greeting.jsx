export const Greeting = ({ names, children }) => {
  return (
    <div>
      {names.map((name) => {
        return <div key={name}>こんにちは {name}</div>;
      })}
      {children}
    </div>
  );
};
