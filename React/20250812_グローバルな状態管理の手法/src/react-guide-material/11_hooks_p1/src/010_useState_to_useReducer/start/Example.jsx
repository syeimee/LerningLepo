import {useState, useReducer} from 'react';
const Example = () => {
  
  const [state, setState] = useState(0);
  const countUp = () =>{
    setState(prev => ++prev);
  }

  // dispatchを実行すると、useReducerの第一引数の関数がよばれる。第二引数は初期値。
  const [rstate, dispatch] = useReducer((prev, {type, step}) => {
switch (type) {
    case '+':
     return prev + step;
    case '-':
     return prev - step;
    default:
      throw new Error('Unknown action: ' + type);
  }
  }, 0);
  const rcountUp = () =>{
    dispatch({type:'+', step: 2});
  }
  const rcountDown = () =>{
    dispatch({type:'-', step: 2});
  }
  return (
    <>
    <h3>useState</h3>
    <h3>{state}</h3>
    <button onClick={countUp}>+</button>
    <h3>useReducer</h3>
    <h3>{rstate}</h3>
    <button onClick={rcountUp}>+</button>
    <button onClick={rcountDown}>-</button>
    </>
  );
};

export default Example;
