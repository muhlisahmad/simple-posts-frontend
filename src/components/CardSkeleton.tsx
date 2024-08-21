const CardSkeleton = () => {
  return (
    <div className="shadow-high flex max-h-52 flex-wrap gap-1 rounded-lg border p-4">
      <span className="h-8 w-full animate-pulse">
        <span className="h-7 w-full">
          <span className="inline-block h-5 w-full rounded-full bg-neutral-300"></span>
        </span>
      </span>
      <span className="w-full">
        <span className="h-5 w-full animate-pulse py-1">
          <span className="inline-block h-[14px] w-full rounded-full bg-neutral-300"></span>
        </span>
        <span className="h-5 w-full animate-pulse py-1">
          <span className="inline-block h-[14px] w-full rounded-full bg-neutral-300"></span>
        </span>
        <span className="h-5 w-full animate-pulse py-1">
          <span className="inline-block h-[14px] w-2/3 rounded-full bg-neutral-300"></span>
        </span>
      </span>
      <span className="h-5 w-full animate-pulse py-1">
        <span className="inline-block h-[14px] w-2/12 rounded-full bg-neutral-300"></span>
      </span>
    </div>
  )
}

export default CardSkeleton
