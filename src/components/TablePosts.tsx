import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loading from './Loading'
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi'

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

const TablePosts = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [fetchDataError, setFetchDataError] = useState<ErrorResponse | null>(
    null
  )
  const [page, setPage] = useState<number | null>(null)
  const [data, setData] = useState<ResponseData | null>(null)
  const location = useLocation()

  const handleDelete = async (
    id: number,
    updateData: {
      title: string
      content: string
      category: string
      status: string
    }
  ) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}article/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })
      const data = await res.json()

      if (!res.ok) {
        console.error(data)
      }

      window.location.reload()
    } catch {
      console.error(data)
      window.location.reload()
    }
  }

  const fetchTableData = useCallback(async () => {
    try {
      const res = await fetch(
        page
          ? `${import.meta.env.VITE_API_URL}article?status=${location.pathname.split('/')[2]}&page=${page}`
          : `${import.meta.env.VITE_API_URL}article?status=${location.pathname.split('/')[2]}`
      )
      const data: ResponseData | ErrorResponse = await res.json()

      if (!res.ok) {
        setData(null)
        setPage(null)
        setFetchDataError(data as ErrorResponse)
      } else {
        setPage((data as ResponseData).paging.page)
        setData(data as ResponseData)
        setFetchDataError(null)
      }
    } catch {
      setPage(null)
      setData(null)
      setFetchDataError({ status: 'error', message: 'Something went wrong' })
    } finally {
      setTableLoading(false)
    }
  }, [location.pathname, page])

  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const renderPageButtons = () => {
    const buttons = []
    if (data && page) {
      if (data.paging.total_page <= 5) {
        for (let i = 1; i <= data.paging.total_page; i++) {
          buttons.push(
            <button
              key={i}
              className={`rounded-sm border px-3 py-2 ${i === page ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
              onClick={() => handlePageClick(i)}
              disabled={i === page}
            >
              {i}
            </button>
          )
        }
      } else {
        buttons.push(
          <button
            key={1}
            className={`rounded-sm border px-3 py-2 ${1 === page ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
            onClick={() => handlePageClick(1)}
            disabled={1 === page}
          >
            1
          </button>
        )

        if (page > 3) {
          buttons.push(
            <button
              key="dots1"
              className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
              disabled
            >
              ...
            </button>
          )
        }

        for (
          let i = Math.max(2, page - 1);
          i < Math.min(data.paging.total_page - 1, page + 1);
          i++
        ) {
          buttons.push(
            <button
              key={i}
              className={`rounded-sm border px-3 py-2 ${i === page ? 'border-darkblue-100 bg-darkblue-700 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
              onClick={() => handlePageClick(i)}
              disabled={i === page}
            >
              {i}
            </button>
          )
        }

        if (page < data.paging.total_page - 2) {
          buttons.push(
            <button
              key="dots2"
              className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
              disabled
            >
              ...
            </button>
          )
        }

        buttons.push(
          <button
            key={data.paging.total_page}
            className={`rounded-sm border px-3 py-2 ${data.paging.total_page === page ? 'border-darkblue-100 bg-darkblue-700 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
            onClick={() => handlePageClick(data.paging.total_page)}
            disabled={data.paging.total_page === page}
          >
            {data.paging.total_page}
          </button>
        )
      }
    }

    return buttons
  }

  return (
    <>
      <div className="shadow-high w-full overflow-auto">
        {tableLoading ? (
          <Loading size="10px" bgSize="484px" />
        ) : (
          <table className="w-full min-w-max table-fixed rounded-md bg-neutral-100">
            <thead>
              <tr className="bg-darkblue-700 grid grid-cols-12">
                <th className="col-span-1 px-4 py-3 text-sm text-neutral-100">
                  No
                </th>
                <th className="col-span-6 px-4 py-3 text-start text-sm text-neutral-100">
                  Title
                </th>
                <th className="col-span-3 px-4 py-3 text-start text-sm text-neutral-100">
                  Category
                </th>
                <th className="col-span-2 px-4 py-3 text-center text-sm text-neutral-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="h-[440px]">
              {data ? (
                data.data.map((article, idx) => (
                  <tr key={idx} className="grid grid-cols-12">
                    <td className="col-span-1 px-4 py-3 text-center text-sm">
                      {idx + 1}
                    </td>
                    <td
                      className={
                        'col-span-6 truncate px-4 py-3 text-start text-sm'
                      }
                    >
                      {article.title}
                    </td>
                    <td className={'col-span-3 px-4 py-3 text-start text-sm'}>
                      {article.category}
                    </td>
                    <td
                      className={
                        'col-span-2 flex items-center justify-center gap-2 px-4 py-3 text-start text-sm'
                      }
                    >
                      <Link
                        to={`/posts/${article.id}`}
                        className="bg-limegreen-700 flex h-6 w-6 items-center justify-center rounded-md text-neutral-100"
                      >
                        <FiEdit />
                      </Link>
                      {location.pathname.split('/')[2] !== 'thrash' && (
                        <button
                          type="button"
                          className="bg-danger flex h-6 w-6 items-center justify-center rounded-md text-neutral-100"
                          onClick={() =>
                            handleDelete(article.id, {
                              title: article.title,
                              content: article.content,
                              category: article.category,
                              status: 'thrash',
                            })
                          }
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="grid grid-cols-12">
                  <td className="col-span-full px-4 py-3 text-center text-sm">
                    {fetchDataError ? fetchDataError.message : ''}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {page && (
        <div className="mt-4 flex justify-end text-xs">
          <button
            className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
            onClick={() => {
              handlePageClick(page - 1)
            }}
            disabled={page === 1}
          >
            <FiChevronsLeft className="text-base" />
          </button>
          {renderPageButtons()}
          <button
            className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
            onClick={() => {
              handlePageClick(page + 1)
            }}
            disabled={data?.paging.total_page === page}
          >
            <FiChevronsRight className="text-base" />
          </button>
        </div>
      )}
    </>
  )
}

export default TablePosts
