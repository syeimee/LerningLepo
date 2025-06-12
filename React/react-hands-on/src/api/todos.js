import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/todos');
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    },
  });
};

const patchTodo = async (todo) => {
  const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
};

export const usePatchTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo) => patchTodo(todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
};

const postTodo = async (todo) => {
  const response = await fetch(`http://localhost:3000/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
};

export const usePostTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo) => postTodo(todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
};
