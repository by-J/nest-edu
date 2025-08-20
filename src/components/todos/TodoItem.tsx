import { Todo, useDeleteTodo, useUpdateTodo } from '@/hooks/todo'
import { useMemo, useState } from 'react'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const { isPending: isPendingForUpdate, mutateAsync: mutateAsyncForUpdate } =
    useUpdateTodo()
  const { isPending: isPendingForDelete, mutateAsync: mutateAsyncForDelete } =
    useDeleteTodo()

  const isLoading = useMemo(
    () => isPendingForUpdate || isPendingForDelete,
    [isPendingForUpdate, isPendingForDelete]
  )

  function onEditMode() {
    setIsEditing(true)
  }

  function offEditMode() {
    setIsEditing(false)
    setTitle(todo.title)
  }

  function handleSave() {
    if (title === todo.title) {
      return
    }
    mutateAsyncForUpdate({ ...todo, title })
    offEditMode()
  }

  function handleDelete() {
    mutateAsyncForDelete(todo.id)
    offEditMode()
  }

  return (
    <li className="flex items-center gap-2">
      {isEditing ? (
        <>
          <input
            className="grow-1 rounded-md border-1 border-gray-300"
            disabled={isLoading}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading}
            onClick={offEditMode}>
            취소
          </button>
          <button
            disabled={isLoading}
            onClick={handleSave}>
            저장
          </button>
          <button
            disabled={isLoading}
            onClick={handleDelete}>
            삭제
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            defaultChecked={todo.done}
          />
          <div className="grow-1">{todo.title}</div>
          <button
            className="mx-5"
            onClick={onEditMode}>
            수정
          </button>
        </>
      )}
    </li>
  )
}
