import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Header from "./components/Header"
import Dashboard, { Room } from "./views/Dashboard"


const rooms: Room[] = [{
  name: "Vacances  à Tahiti",
  id: "general",
  members: ["You", "Denis", "Ken"],
  transactions: [{
    amount: 10,
    date: new Date(),
    receiver: "You",
    sender: "Denis",
    title: "Pizza"
  },
  {
    amount: 14,
    date: new Date(),
    receiver: "You",
    sender: "Denis",
    title: "Pizza 2"
  },
  {
    amount: 14,
    date: new Date(),
    receiver: "You",
    sender: "Denis",
    title: "Pizza 2"
  },
  {
    amount: 14,
    date: new Date(),
    receiver: "You",
    sender: "Denis",
    title: "Pizza 2"
  },
  {
    amount: 14,
    date: new Date(),
    receiver: "You",
    sender: "Denis",
    title: "Pizza 2"
  }
  ]
}
]

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
    element: <Dashboard room={rooms[0]} />,
  }
])

function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
