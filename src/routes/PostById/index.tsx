import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleForm from '../../components/ArticleForm'

type ResponseData = {
  status: string
  data: {
    id: number
    title: string
    content: string
    category: string
    status: string
  }
}

const PostById = () => {
  const [data, setData] = useState<ResponseData | null>(null)
  const { id } = useParams()

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}article/${id}`)
      const result: ResponseData = await res.json()

      if (!res.ok) {
        console.error(result)
      } else {
        setData(result)
      }
    } catch (error) {
      console.error(error)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="container mx-auto my-4 px-4 py-10">
      <ArticleForm article={data?.data} />
    </div>
  )
}

export default PostById
