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
import Share from "./views/Share"
import HomeDashboard from "./views/HomeDashboard"
import { ToastProvider } from "./contexts/ToastContext"
import UserSettings from "./views/UserSettings"
import Reimbursments from "./views/Reimbursments"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <AuthProvider><Login /></AuthProvider>,
  },
  {
    path: "/register",
    element: <AuthProvider><Register /></AuthProvider>,
  },
  {
    path: "/join/:id",
    element: <AuthProvider><Share /></AuthProvider>,
  },
  {
    path: "/dashboard",
    element: <AuthProvider><HomeDashboard /></AuthProvider>,
  },
  {
    path: "/settings",
    element: <AuthProvider><UserSettings /></AuthProvider>,
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
      },{
        path: "/dashboard/:id/reimbursments",
        element: <Reimbursments />,
      }
    ]
  }
])

const queryClient = new QueryClient()

function App() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ToastProvider>
  )
}

export default App
