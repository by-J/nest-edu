import { useFetchTodos } from '@/hooks/todo'

export default function TodoList() {
  const { data: todos } = useFetchTodos()
  return (
    <>
      <ul>
        {todos?.map(todo => {
          return <li key={todo.id}>{todo.title}</li>
        })}
      </ul>
    </>
  )
}
