import { useForm } from 'react-hook-form';
import { usePostTodo } from '../api/todos';

export const TodoForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate } = usePostTodo();
  const submitForm = (data) => {
    if (!data.title) {
      return;
    }
    mutate(
      {
        title: data.title,
      },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input type="text" {...register('title')} />
      <button className="btn btn-primary btn-sm">追加</button>
    </form>
  );
};
