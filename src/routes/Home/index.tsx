import { useCallback, useEffect, useState } from 'react'
import Card from '../../components/Card'
import CardSkeleton from '../../components/CardSkeleton'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type ErrorResponse = {
  status: string
  message: string
}

type ResponseData = {
  status: string
  data: {
    id: number
    title: string
    content: string
    category: string
    status: string
  }[]
  paging: {
    page: number
    size: number
    total_page: number
  }
}

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const [data, setData] = useState<ResponseData | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams(location.search)
      const page = params.get('page')
      const res = await fetch(
        page
          ? `${import.meta.env.VITE_API_URL}article?status=publish&page=${page}`
          : `${import.meta.env.VITE_API_URL}article?status=publish`
      )
      const data: ResponseData | ErrorResponse = await res.json()

      if (!res.ok) {
        setData(null)
        setError(data as ErrorResponse)
      } else {
        setData(data as ResponseData)
        setError(null)
      }
    } catch {
      setData(null)
      setError({ status: 'error', message: 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }, [location.search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="container mx-auto my-4 grid grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
      {loading
        ? [0, 1, 2].map((_, idx) => <CardSkeleton key={idx} />)
        : data
          ? data.data.map((article, idx) => (
              <Card key={idx} article={article} />
            ))
          : error && <p>{error.message}</p>}
      {data && (
        <div className="col-span-full flex justify-center">
          <div className="my-4 flex w-fit justify-between gap-6">
            <button
              disabled={data.paging.page === 1}
              type="button"
              onClick={() => {
                navigate(`?page=${data.paging.page - 1}`)
              }}
              className="hover:bg-limegreen-700 group flex h-8 w-8 items-center justify-center rounded-full border border-[#c4c4c4] hover:border-none"
            >
              <FiChevronLeft className="group-hover:invert" />
            </button>
            <button
              disabled={data.paging.page === data.paging.total_page}
              onClick={() => {
                navigate(`?page=${data.paging.page + 1}`)
              }}
              className="hover:bg-limegreen-700 group flex h-8 w-8 items-center justify-center rounded-full border border-[#c4c4c4] hover:border-none"
            >
              <FiChevronRight className="group-hover:invert" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
