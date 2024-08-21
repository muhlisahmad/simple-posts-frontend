import { FiArchive, FiHome, FiPlus } from 'react-icons/fi'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const DashboardLayout = () => {
  const location = useLocation()
  return (
    <div
      className={`flex h-screen ${location.pathname.split('/')[1] === 'new-post' || location.pathname.split('/')[1] === 'post' ? 'bg-[#f4f5f7]' : 'bg-neutral-100'}`.trim()}
    >
      <aside className="bg-darkblue-700 h-full max-w-80">
        {/* <div className="h-20 w-20 p"></div> */}
        <NavLink
          to={'/new-post'}
          className={({ isActive }) =>
            isActive
              ? 'flex w-full items-center bg-neutral-100 bg-opacity-30 p-6 font-bold text-neutral-100 hover:bg-opacity-40'
              : 'flex w-full items-center p-6 text-neutral-100 hover:bg-neutral-100 hover:bg-opacity-40'
          }
        >
          <FiPlus className="text-3xl" />
        </NavLink>
        <NavLink
          to={'/home'}
          className={({ isActive }) =>
            isActive
              ? 'flex h-20 w-full flex-wrap items-center justify-center gap-1 bg-neutral-100 bg-opacity-30 py-5 text-neutral-100 hover:bg-opacity-40'
              : 'flex h-20 w-full flex-wrap items-center justify-center gap-1 py-5 font-bold text-neutral-100 hover:bg-neutral-100 hover:bg-opacity-40'
          }
        >
          <FiHome className="w-full text-2xl" />
          <span className="text-xs">Preview</span>
        </NavLink>
        <NavLink
          to={'/all-posts'}
          className={({ isActive }) =>
            isActive
              ? 'flex h-20 w-full flex-wrap items-center justify-center gap-1 bg-neutral-100 bg-opacity-30 py-5 text-neutral-100 hover:bg-opacity-40'
              : 'flex h-20 w-full flex-wrap items-center justify-center gap-1 py-5 font-bold text-neutral-100 hover:bg-neutral-100 hover:bg-opacity-40'
          }
        >
          <FiArchive className="w-full text-2xl" />
          <span className="text-xs">All Posts</span>
        </NavLink>
      </aside>
      <div className="h-full w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
