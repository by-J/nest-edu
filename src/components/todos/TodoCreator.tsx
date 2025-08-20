import { useCreateTodo } from '@/hooks/todo'
import { useState } from 'react'

export default function TodoCreator() {
  const { isPending, mutate, mutateAsync } = useCreateTodo()
  const [title, setTitle] = useState('')

  function handleCreate() {
    mutate({ title })
    setTitle('')
  }

  return (
    <div className="todo-creator">
      <input
        disabled={isPending}
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          // unicode에 대해 처리중, 처리완료 두번 이벤트 발생 그래서 처리중일때는 이벤트 처리 안하기
          if (e.nativeEvent.isComposing) return
          if (e.key === 'Enter') {
            handleCreate()
          }
        }}
      />
      <button
        disabled={isPending}
        onClick={handleCreate}>
        Add
      </button>
    </div>
  )
}
