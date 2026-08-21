import MainContent from "../pages/MainContent.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import {useRoutes} from "react-router-dom";
import AddContent from "../pages/AddContent.tsx";
import ContentDetail from "../pages/ContentDetail.tsx";

function MainRouter() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout/>,
      children: [
        {index: true, element: <MainContent/>},
        {path: "/add", element: <AddContent/>},
        {path: ":id", element: <ContentDetail/>}
      ],
    },
  ])
}

export default MainRouter;