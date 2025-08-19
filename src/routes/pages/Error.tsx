import { Link } from 'react-router'

export default function Error() {
  return (
    <>
      <h1>404 페이지를 찾을 수 없습니다!</h1>
      <Link to="/">To Home...</Link>
    </>
  )
}
