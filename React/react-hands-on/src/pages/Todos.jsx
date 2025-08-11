import { useGetTodos, usePatchTodo } from '../api/todos';
import { TodoForm } from './TodoForm';

export const Todos = () => {
  const { data, isPending, error } = useGetTodos();
  const { mutate } = usePatchTodo();

  const handleChange = (e) => {
    const id = e.target.value;
    mutate({
      id,
      done: true,
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <>
      <h1>Todos</h1>
      <TodoForm />
      {data.map(({ id, done, title }) => (
        <div key={id}>
          <input
            id={id}
            type="checkbox"
            value={id}
            defaultChecked={done}
            onChange={handleChange}
          />
          <label htmlFor={id}>{title}</label>
        </div>
      ))}
    </>
  );
};
