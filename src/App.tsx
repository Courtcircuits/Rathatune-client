import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Dashboard from "./views/Dashboard"
import Transactions from "./views/Transactions"
import Leaderboard from "./views/Leaderboard"
import RoomSettings from "./views/RoomSettings"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "/dashboard/",
        element: <Transactions />,
      },
      {
        path: "/dashboard/transactions",
        element: <Transactions />,
      },
      {
        path: "/dashboard/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/dashboard/settings",
        element: <RoomSettings />,
      }
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
