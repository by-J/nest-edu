import { NavLink } from 'react-router'

const navigations = [
  {
    to: '/',
    lable: 'Home',
  },
  {
    to: '/About',
    lable: 'About',
  },
  {
    to: '/movies',
    lable: 'Movies',
  },
  {
    to: '/signin',
    lable: 'Sign In',
  },
  {
    to: '/todos',
    lable: 'Todos',
  },
]

export default function Header() {
  return (
    <header className="flex gap-2.5">
      {navigations.map(nav => (
        <NavLink
          key={nav.to}
          to={nav.to}
          className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
          {nav.lable}
        </NavLink>
      ))}
    </header>
  )
}
