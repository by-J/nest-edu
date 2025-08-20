import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: 'KDT8_bcAWVpD8',
    username: 'KDT8_ParkYoungWoong',
  },
})

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { title: string }) => {
      await api.post('/', data)
    },
    onMutate: async data => {
      // 낙관적 업데이트 미리 적용
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        queryClient.setQueryData(
          ['todos'],
          [{ ...data, id: Math.random().toString() }, ...todos]
        )
      }
      return { todos }
    },
    onSuccess: async () => {
      // 성공 했을 시 쿼리를 무효화해서 새로운 fetch
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
    onError: async (_error, _data, context) => {
      if (context && context.todos) {
        queryClient.setQueryData(['todos'], context.todos)
      }
    },
    onSettled: async () => {},
  })
}

export function useFetchTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await api.get<Todo[]>('/')
      return data
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      await api.put(`/${todo.id}`, todo)
    },
    onMutate: async todo => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        const newTodos = todos.map(t => (t.id === todo.id ? todo : t))
        queryClient.setQueryData(['todos'], newTodos)
      }
      //에러 처리를 위해 원본 리턴, => onError의 context.todos
      return { todos }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
    onError: async (_error, _data, context) => {
      if (context && context.todos) {
        queryClient.setQueryData(['todos'], context.todos)
      }
    },
    onSettled: async () => {},
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todoId: string) => {
      await api.delete(`/${todoId}`)
    },
    onMutate: async todoId => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        const newTodos = todos.filter(todo => todo.id !== todoId)
        queryClient.setQueryData(['todos'], newTodos)
      }
      return { todos }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
    onError: async (_error, _todoId, context) => {
      if (context && context.todos) {
        queryClient.setQueryData(['todos'], context.todos)
      }
    },
    onSettled: async () => {},
  })
}
