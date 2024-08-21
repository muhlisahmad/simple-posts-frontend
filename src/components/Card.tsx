type Article = {
  id: number
  title: string
  content: string
  category: string
  status: string
}

const Card = ({ article }: { article: Article }) => {
  return (
    <div className="shadow-high flex max-h-52 flex-wrap gap-1 rounded-lg border p-4">
      <h1 className="w-full truncate text-xl font-bold">{article.title}</h1>
      <p className="text-display line-clamp-3 w-full text-sm">
        {article.content}
      </p>
      <span className="text-display bg-darkblue-700 font-display mt-2 line-clamp-3 flex items-center justify-center rounded-full px-3 py-1 text-xs leading-3 text-neutral-100">
        {article.category}
      </span>
    </div>
  )
}

export default Card
