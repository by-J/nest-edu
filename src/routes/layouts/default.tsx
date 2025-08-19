import Header from '@/components/Header'
import { Outlet, useOutlet } from 'react-router'

export default function DefaultLayout() {
  const outlet = useOutlet()
  return (
    <>
      <Header />
      {outlet}
      {/* <Outlet /> */}
    </>
  )
}
