import { FormEvent, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export default function SignIn() {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const token = id + pw
    if (id && pw) {
      localStorage.setItem('accessToken', token)
    }
    console.log(searchParams)
    navigate(redirectTo || '/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <input
        type="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      <button type="submit">Sign In!</button>
    </form>
  )
}
