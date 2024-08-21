import { useCallback, useEffect } from 'react'
import { FiFileText, FiSend, FiTrash } from 'react-icons/fi'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

const AllPostsLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const redirect = useCallback(() => {
    if (location.pathname === '/all-posts') {
      navigate('/all-posts/publish', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    redirect()
  }, [redirect])

  return (
    <div className="container mx-auto my-4 px-4 py-6">
      <span className="shadow-high my-4 flex w-full justify-around divide-x-2 rounded-full">
        <NavLink
          className={
            'flex w-full items-center justify-center gap-2 rounded-l-full px-5 py-3 font-bold hover:bg-neutral-300'
          }
          to={'/all-posts/publish'}
        >
          <FiSend />
          <span className="max-sm:hidden">Publish</span>
        </NavLink>
        <NavLink
          className={
            'flex w-full items-center justify-center gap-2 px-5 py-3 font-bold hover:bg-neutral-300'
          }
          to={'/all-posts/draft'}
        >
          <FiFileText />
          <span className="max-sm:hidden">Draft</span>
        </NavLink>
        <NavLink
          className={
            'rouded-r-full flex w-full items-center justify-center gap-2 px-5 py-3 font-bold hover:bg-neutral-300'
          }
          to={'/all-posts/thrash'}
        >
          <FiTrash />
          <span className="max-sm:hidden">Trash</span>
        </NavLink>
      </span>
      <Outlet />
    </div>
  )
}

export default AllPostsLayout
