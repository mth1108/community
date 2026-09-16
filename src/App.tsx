import MainRouter from "./routes/MainRouter.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import GuestRouter from "./routes/GuestRouter.tsx";
import Login from "./pages/Login.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import MainContent from "./pages/MainContent.tsx";
import AddContent from "./pages/AddContent.tsx";
import ContentDetail from "./pages/ContentDetail.tsx";
import Signup from "./pages/Signup.tsx";

function App() {

  const router = createBrowserRouter([
    {
      element: <GuestRouter />,
      children: [
        {path: "/login", element: <Login />},
        {path: "/signup", element: <Signup />}
      ]
    },
    {
      element: <MainRouter />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/main",
              children: [
                {index: true, element: <MainContent/>},
                {path: "add", element: <AddContent/>},
                {path: ":id", element: <ContentDetail/>}
              ]
            }
          ]
        }
      ]

    }

  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App
