import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Delayed({ wait }: { wait: number }) {
  const { data, isLoading, refetch } = useQuery({
    // queryKey: ['delay', {}, []], object, array 다 가능
    queryKey: ['delay', wait],
    queryFn: async () => {
      const { data } = await axios(`https://api.heropy.dev/v0/delay?t=${wait}`)
      return data
    },
    enabled: true,
    // initialData: {
    //   message: '초기 데이터 입니다!',
    //   time: '1234',
    // },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  })
  return (
    <>
      <h1>Delayed!!</h1>
      <h2>{JSON.stringify(data)}</h2>
      <h3>{JSON.stringify(isLoading)}</h3>
      <button onClick={() => refetch()}>다시 가져와</button>
    </>
  )
}
