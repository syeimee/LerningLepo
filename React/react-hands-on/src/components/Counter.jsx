import {
  memo,
  useState,
  useReducer,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { useAtom } from 'jotai';
import { counterAtom } from '../state/counterAtom';

export const Note = memo(({ now }) => (
  <p>
    Edit <code>src/App.jsx</code> and save to test HMR at {now}
  </p>
));

export const Counter = ({ children }) => {
  const [count, setCount] = useAtom(counterAtom);

  const now = useMemo(() => {
    return Date.now();
  }, []);

  const handleClick = useCallback(
    () => setCount((prevCount) => prevCount + 1),
    []
  );

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    return () => {
      console.log('cleanup');
    };
  }, []);

  return (
    <div className="card">
      <input type="text" />
      <button className="btn btn-secondary" onClick={handleClick} ref={ref}>
        count is {count}
      </button>
      <Note now={now} handleClick={handleClick} />
      {children}
    </div>
  );
};

export const ObjectCounter = () => {
  const [count, setCount] = useState({ value: 0 });

  return (
    <div className="card">
      <button
        className="btn btn-secondary"
        onClick={() =>
          setCount({
            ...count,
            value: count.value + 1,
          })
        }
      >
        count is {count.value}
      </button>
    </div>
  );
};

const initialState = {
  value: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case incrementAction.type: {
      return {
        ...state,
        value: state.value + 1,
      };
    }
    case incrementByNAction.type: {
      return {
        ...state,
        value: state.value + action.payload,
      };
    }
    default:
      return state;
  }
};

const incrementAction = {
  type: 'increment',
};

const incrementByNAction = {
  type: 'incrementByN',
  payload: 1,
};

const createIncrementByNAction = (n) => ({
  ...incrementByNAction,
  payload: n,
});

export const CounterWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="card">
      <button
        className="btn btn-secondary"
        onClick={() => dispatch(createIncrementByNAction(3))}
      >
        count is {state.value}
      </button>
    </div>
  );
};
