import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Dashboard from "./views/Dashboard"
import Transactions from "./views/Transactions"
import Leaderboard from "./views/Leaderboard"
import RoomSettings from "./views/RoomSettings"
import { AuthProvider } from "./contexts/AuthContext"
import Register from "./views/Register"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import store from "./store/store"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <AuthProvider><Login/></AuthProvider>,
  },
  {
    path: "/register",
    element: <AuthProvider><Register /></AuthProvider>,
  },
  {
    path: "/dashboard/:id",
    element: <AuthProvider><Dashboard /></AuthProvider>,
    children: [
      {
        path: "/dashboard/:id/",
        element: <Transactions />,
      },
      {
        path: "/dashboard/:id/transactions",
        element: <Transactions />,
      },
      {
        path: "/dashboard/:id/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/dashboard/:id/settings",
        element: <RoomSettings />,
      }
    ]
  }
])

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
