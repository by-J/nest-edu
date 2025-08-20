import { useFetchTodos } from '@/hooks/todo'
import TodoItem from './TodoItem'

export default function TodoList() {
  const { data: todos } = useFetchTodos()
  return (
    <>
      <ul>
        {todos?.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          )
        })}
      </ul>
    </>
  )
}
