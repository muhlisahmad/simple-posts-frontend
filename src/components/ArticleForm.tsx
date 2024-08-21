import { SubmitHandler, useForm } from 'react-hook-form'
import Form from './Form'
import Label from './Label'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

type ArticleFormValue = {
  title: string
  content: string
  category: string
  status: string
}

type Article = ArticleFormValue & {
  id: number
}

const ArticleForm = ({ article }: { article?: Article }) => {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const onSubmit: SubmitHandler<ArticleFormValue> = async (articleData) => {
    try {
      const res = await fetch(
        article
          ? `${import.meta.env.VITE_API_URL}article/${article.id}`
          : `${import.meta.env.VITE_API_URL}article`,
        {
          method: article ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        }
      )
      const data = await res.json()

      if (!res.ok) {
        console.error(data)
      }

      navigate('/all-posts', { replace: true })
    } catch (error) {
      console.error(error)
      navigate('/all-posts', { replace: true })
    }
  }
  const methods = useForm<ArticleFormValue>({ mode: 'onBlur' })

  return (
    <>
      <Form ref={formRef} onSubmit={onSubmit} methods={methods}>
        <div className="shadow-high flex w-full flex-wrap gap-4 rounded-md bg-neutral-100 p-4">
          <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
            <Label htmlFor="title" className="md:col-span-3">
              Title
            </Label>
            <Input
              name="title"
              id="title"
              value={article ? article.title : ''}
              className="bg-opacity-0 md:col-span-7"
              validation={{
                required: 'Title is required',
                minLength: {
                  value: 20,
                  message: 'Title must contains at least 20 characters',
                },
              }}
            />
            {methods.formState.errors.title && (
              <p className="font-display text-danger text-[10px] md:col-span-7 md:col-start-4">
                {methods.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-wrap gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
            <Label htmlFor="content" className="md:col-span-3">
              Content
            </Label>
            <TextArea
              name="content"
              value={article ? article.content : ''}
              id="content"
              className="bg-opacity-0 md:col-span-7"
              rows={12}
              validation={{
                required: 'Content is required',
                minLength: {
                  value: 100,
                  message: 'Content must contains at least 100 characters',
                },
              }}
            />
            {methods.formState.errors.content && (
              <p className="font-display text-danger text-[10px] md:col-span-7 md:col-start-4">
                {methods.formState.errors.content.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
            <Label htmlFor="category" className="md:col-span-3">
              Category
            </Label>
            <Input
              name="category"
              value={article ? article.category : ''}
              id="category"
              className="bg-opacity-0 md:col-span-7"
              validation={{
                required: 'Category is required',
                minLength: {
                  value: 3,
                  message: 'Category must contains at least 3 characters',
                },
              }}
            />
            {methods.formState.errors.category && (
              <p className="font-display text-danger text-[10px] md:col-span-7 md:col-start-4">
                {methods.formState.errors.category.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <Button
            type="button"
            disabled={
              !methods.formState.isValid ||
              !methods.formState.isDirty ||
              methods.formState.isSubmitting
            }
            variant="primary"
            onClick={() => {
              methods.setValue('status', 'publish')
              if (formRef.current) {
                formRef.current.submit()
              }
            }}
          >
            Publish
          </Button>
          <Button
            type="button"
            disabled={
              !methods.formState.isValid ||
              !methods.formState.isDirty ||
              methods.formState.isSubmitting
            }
            onClick={() => {
              methods.setValue('status', 'thrash')
              if (formRef.current) {
                formRef.current.submit()
              }
            }}
            variant="secondary"
          >
            Draft
          </Button>
        </div>
      </Form>
    </>
  )
}

export default ArticleForm
