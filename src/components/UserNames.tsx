import { useQuery } from '@tanstack/react-query'

type Users = User[]
interface User {
  id: string
  name: string
  age: number
}

export default function UserNames() {
  const { data } = useQuery<Users>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://api.heropy.dev/v0/users')
      const { users } = await res.json()
      return users
    },
    staleTime: 1000 * 10,
    select: data => data.filter(user => user.age < 40),
  })
  return (
    <>
      <h2>User Names</h2>
      <ul>
        {data?.map((user, i) => (
          <li key={i}>
            {user.name}({user.age})
          </li>
        ))}
      </ul>
    </>
  )
}
