import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import AllPostsLayout from './layouts/AllPostsLayout'
import TablePosts from './components/TablePosts'
import Home from './routes/Home'
import ArticleForm from './components/ArticleForm'
import NewPost from './routes/NewPost'
import PostById from './routes/PostById'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<DashboardLayout />}>
          <Route index element={<h1>Hello World</h1>} />
          <Route path="home" element={<Home />} />
          <Route path="all-posts" element={<AllPostsLayout />}>
            <Route path="publish" element={<TablePosts />} />
            <Route path="draft" element={<TablePosts />} />
            <Route path="thrash" element={<TablePosts />} />
          </Route>
          <Route path="posts/:id" element={<PostById />} />
          <Route
            path="new-post"
            element={
              <NewPost>
                <ArticleForm />
              </NewPost>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
