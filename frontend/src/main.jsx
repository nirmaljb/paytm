import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import ErrorPage from './error-page'
import Signup from './routes/signup'
import Login from './routes/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
